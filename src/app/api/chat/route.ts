import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { getVectorStore } from "@/lib/rag";

// DeepSeek Model Yapılandırması (LangChain üzerinden)
const chatModel = new ChatOpenAI({
  modelName: "deepseek-chat", // V3 modeli
  temperature: 0.7,
  configuration: {
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
  }
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    // Son kullanıcı mesajını al
    const currentQuestion = messages[messages.length - 1]?.content || "";

    // 1. Vektör Mağazasını Getir
    const vectorStore = await getVectorStore();

    // 2. Retriever (Getirici) Oluştur
    // "En alakalı 4 parçayı getir"
    const retriever = vectorStore.asRetriever(8);

    // 3. Prompt Şablonunu Hazırla
    const prompt = PromptTemplate.fromTemplate(`
      Sen Mehmet Burçhan Gürses'in Portfolyo Asistanısın.
      
      Aşağıdaki "BAĞLAM" içinde Mehmet'in CV'sinden ve projelerinden parçalar yer almaktadır.

      GÖREVİN:
      1. Kullanıcının sorusunu bu bağlama göre cevapla.
      2. Eğer kullanıcı "Kimdir?" diye sorarsa, bağlamdaki projelere ve teknolojilere bakarak onun "Şu teknolojileri kullanan bir Yazılım Geliştirici" olduğu çıkarımını yap ve anlat.
      3. Bağlamda bilgi yoksa uydurma.
      
      --- BAĞLAM ---
      {context}
      --- BAĞLAM SONU ---

      Soru: {question}
      Cevap:
    `);

    // 4. Zinciri (Chain) Kur: [Dokümanları Al] -> [Prompt'a Koy] -> [Model'e Sor] -> [Metne Çevir]
    const chain = RunnableSequence.from([
      {
        context: async (input: string) => {
          // Retriever ile alakalı dökümanları çek ve metne çevir
          const relevantDocs = await retriever.invoke(input);
          console.log(`🔍 Bulunan alakalı parça sayısı: ${relevantDocs.length}`);
          const retrievedContext = relevantDocs.map((doc) => doc.pageContent).join("\n\n---\n\n")
          console.log(retrievedContext);
          return retrievedContext;
        },
        question: (input: string) => input,
      },
      prompt,
      chatModel,
      new StringOutputParser(),
    ]);

    // 5. Zinciri Çalıştır ve Cevabı Al
    console.log("🐳 DeepSeek'e soruluyor...");
    const response = await chain.invoke(currentQuestion);
    console.log("✅ Cevap hazır.");

    return NextResponse.json({ role: 'assistant', content: response });

  } catch (error: any) {
    console.error("RAG Hatası:", error);
    return NextResponse.json({ 
      role: 'assistant', 
      content: "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar dene." 
    });
  }
}