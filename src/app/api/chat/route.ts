import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { getVectorStore } from "@/lib/rag";

// DeepSeek Model Yapılandırması (LangChain üzerinden)
const chatModel = new ChatOpenAI({
  modelName: "deepseek-v4-flash",
  temperature: 0.7,
  streaming: true,
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

    // 5. Zinciri STREAM olarak çalıştır
    console.log("🐳 DeepSeek'e soruluyor (streaming)...");
    const stream = await chain.stream(currentQuestion);

    // 6. ReadableStream ile SSE (Server-Sent Events) olarak client'a akıt
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify({ content: chunk });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          console.log("✅ Cevap hazır (streaming).");
        } catch (error) {
          console.error("Stream hatası:", error);
          const errData = JSON.stringify({ error: "Akış sırasında bir hata oluştu." });
          controller.enqueue(encoder.encode(`data: ${errData}\n\n`));
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });

  } catch (error: any) {
    console.error("RAG Hatası:", error);
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      start(controller) {
        const data = JSON.stringify({ error: "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar dene." });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  }
}