# 🚀 AI-Powered Next.js Portfolio (LangChain + LanceDB)

Bu proje, modern web teknolojilerini **LangChain** frameworkü ile güçlendirilmiş **Yapay Zeka** mühendisliği ile birleştiren yeni nesil bir portfolyo sitesidir. Standart bir statik siteden farklı olarak, ziyaretçilerle etkileşime giren, hem CV hem de GitHub projelerini analiz eden ve soruları yanıtlayan **akıllı bir chatbot** içerir.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![LangChain](https://img.shields.io/badge/LangChain-1.2-green) ![DeepSeek](https://img.shields.io/badge/AI-DeepSeek_V3-blueviolet) ![LanceDB](https://img.shields.io/badge/Database-LanceDB-orange)

## 🌟 Öne Çıkan Özellikler

* **💬 Akıllı AI Asistanı:** Ziyaretçilerin sorularını (örn: "Mehmet hangi teknolojileri biliyor?", "Backend tecrübesi var mı?") anlık olarak cevaplar.
* **🔗 LangChain Framework:** Endüstri standardı LangChain frameworkü ile modüler ve genişletilebilir RAG pipeline.
* **🧠 Gelişmiş RAG Mimarisi:** Veriler **LanceDB** (Embedded Vector DB) üzerinde tutulur. JSON tabanlı sistemlere göre çok daha hızlı ve ölçeklenebilirdir.
* **⚡ Sınırsız & Ücretsiz Embedding:** Vektör oluşturmak için harici bir API (OpenAI/Google) kullanılmaz. `@huggingface/transformers` ile tamamen lokalde çalışır.
* **🔗 Çoklu Veri Kaynağı:** Sadece `cv.pdf` dosyasını değil, aynı zamanda **GitHub Repolarını** da otomatik çekip analiz eder.
* **🛡️ Vercel Serverless Uyumlu:** Disk tabanlı veritabanı yapısı sayesinde Vercel'in RAM limitlerine takılmadan yüksek performansla çalışır.
* **🎨 Modern UI/UX:** `Framer Motion` animasyonları, Glassmorphism tasarımı ve Responsive yapı.

---

## 🏗️ Mimari ve LangChain RAG Pipeline

Bu proje, **LangChain** frameworkünün sunduğu güçlü bileşenler ile oluşturulmuş profesyonel bir RAG (Retrieval-Augmented Generation) sistemi kullanır.

### 1. Veri İşleme ve Vektörleştirme - *The Engine* ⚙️

Sistem, LangChain'in doküman yükleme ve işleme araçlarını kullanarak `src/lib/rag.ts` içinde çalışır:

* **Veri Toplama:** 
  - **PDFLoader:** LangChain'in `@langchain/community` paketinden `PDFLoader` ile `cv.pdf` dosyası okunur
  - **GitHub Integration:** GitHub API üzerinden projeler (`fetchGithubRepos`) çekilir ve LangChain `Document` objelerine dönüştürülür
  
* **Akıllı Parçalama (Text Splitting):** 
  - **RecursiveCharacterTextSplitter:** LangChain'in text splitter'ı ile dökümanlar 500 karakterlik parçalara bölünür (50 karakter overlap ile)
  - Her parça metadata ile zenginleştirilir (sayfa numarası, kaynak, tip, yazar bilgisi)
  
* **Embedding Oluşturma:** 
  - **HuggingFaceTransformersEmbeddings:** `Xenova/all-MiniLM-L6-v2` modeli ile metinler 384 boyutlu vektörlere dönüştürülür
  - Tamamen lokal çalışır, harici API gerektirmez
  
* **Vektör Depolama:** 
  - **LanceDB VectorStore:** LangChain'in LanceDB entegrasyonu ile vektörler disk tabanlı `.lancedb` klasörüne kaydedilir
  - Serverless ortamlarda yüksek performans sağlar

### 2. Retrieval Chain - *The Search* 🔍

LangChain'in **Retriever** ve **RunnableSequence** yapıları ile oluşturulan akıllı arama sistemi:

1. **Retriever:** Vector store'dan `asRetriever(8)` metodu ile en alakalı 8 doküman çekilir
2. **Context Builder:** Çekilen dokümanlar birleştirilerek bağlam oluşturulur
3. **Optimizasyon:** LanceDB'nin C++ tabanlı arama motoru milisaniyeler içinde sonuç döner

### 3. Generation Chain - *The Voice* 🗣️

LangChain'in **Chain** mimarisi ile oluşturulan cevap üretim sistemi:

* **PromptTemplate:** Dinamik prompt şablonu ile bağlam ve soru birleştirilir
* **ChatOpenAI:** DeepSeek V3 modeli LangChain'in OpenAI uyumlu chat modeli ile entegre edilir
* **StringOutputParser:** Model çıktısı düz metne çevrilir
* **RunnableSequence:** Tüm adımlar bir chain içinde sırayla çalıştırılır:
  ```
  [Retrieval] → [Prompt Building] → [LLM Call] → [Output Parsing]
  ```

---

## 🛠️ Teknoloji Yığını

* **Framework:** Next.js 16 (App Router & Turbopack)
* **Dil:** TypeScript
* **AI Framework:** 
    * **LangChain** 1.2.13 (Core framework)
    * `@langchain/community` (Vektör depoları ve doküman yükleyiciler)
    * `@langchain/openai` (DeepSeek entegrasyonu)
    * `@langchain/core` (Temel yapılar: Runnables, Prompts, Parsers)
* **Veritabanı (Vector DB):** LanceDB 0.23 (Embedded & Serverless)
* **Embeddings:** 
    * `@huggingface/transformers` 3.8 (Lokal embedding modeli)
    * Model: `Xenova/all-MiniLM-L6-v2`
* **Document Processing:**
    * `pdf-parse` (PDF okuma)
    * `pdf2json` (PDF işleme)
    * LangChain PDFLoader ve RecursiveCharacterTextSplitter
* **Styling:** Tailwind CSS 4
* **UI Library:** Lucide React, Framer Motion

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için adımları izleyin:

1.  **Repoyu Klonlayın:**
    ```bash
    git clone https://github.com/KULLANICI_ADIN/REPO_ADIN.git
    cd portfolyo2
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

3.  **Çevresel Değişkenleri Ayarlayın:**
    Ana dizinde `.env` dosyası oluşturun ve gerekli API anahtarlarını ekleyin:
    ```env
    DEEPSEEK_API_KEY=sk-senin-api-anahtarin
    GITHUB_USERNAME=github-kullanici-adin
    GITHUB_TOKEN=github-token (opsiyonel, rate limit için önerilir)
    ```

4.  **CV Dosyasını Ekleyin:**
    Projenin kök dizinine `cv.pdf` dosyanızı yerleştirin.

5.  **Projeyi Başlatın:**
    ```bash
    npm run dev
    ```
    
    **İlk Başlatma:** Sistem otomatik olarak:
    - PDF'i yükler ve parçalara ayırır
    - GitHub projelerini çeker
    - Embedding modelini indirir (ilk seferde ~50MB)
    - Vektör veritabanını oluşturur
    
    *Terminalde "✅ Sunucu Başlangıç Kontrolleri Tamamlandı!" mesajını gördüğünüzde işlem tamamdır.*

6.  **Tarayıcıda Açın:**
    ```
    http://localhost:3000
    ```

---

## 📂 Proje Yapısı

```
.
├── .lancedb/                          # 🗄️ LanceDB vektör veritabanı (otomatik oluşur)
├── public/                            # Statik dosyalar (görseller, favicon)
├── src/
│   ├── instrumentation.ts             # Next.js instrumentation (startup hooks)
│   ├── app/
│   │   ├── layout.tsx                 # Ana layout
│   │   ├── page.tsx                   # Ana sayfa
│   │   ├── globals.css                # Global stiller
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts           # 🤖 Chat API (LangChain RAG Pipeline)
│   ├── components/
│   │   ├── ChatInterface.tsx          # 💬 Chat UI bileşeni
│   │   ├── Hero.tsx                   # Hero section
│   │   ├── Header.tsx                 # Navigation
│   │   ├── Footer.tsx                 # Footer
│   │   ├── Projects.tsx               # Projeler bölümü
│   │   ├── Skills.tsx                 # Yetenekler
│   │   ├── Timeline.tsx               # Zaman çizelgesi
│   │   └── Certifications.tsx         # Sertifikalar
│   └── lib/
│       ├── rag.ts                     # 🧠 RAG Motoru (LangChain + LanceDB)
│       ├── github.ts                  # 🐙 GitHub API entegrasyonu
│       ├── data.ts                    # Statik veriler
│       └── utils.ts                   # Yardımcı fonksiyonlar
├── next.config.ts                     # Next.js yapılandırması
├── tsconfig.json                      # TypeScript ayarları
├── cv.pdf                             # Kaynak CV dosyası (eklenecek)
└── package.json                       # Proje bağımlılıkları
```

---

## 🔄 LangChain RAG Pipeline Detayları

### Chat API Endpoint (`/api/chat/route.ts`)

Bu endpoint, LangChain'in tüm gücünü kullanan modüler bir RAG pipeline içerir:

```typescript
// 1. Model Yapılandırması
const chatModel = new ChatOpenAI({
  modelName: "deepseek-chat",
  temperature: 0.7,
  configuration: {
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
  }
});

// 2. Retriever Oluşturma
const vectorStore = await getVectorStore();
const retriever = vectorStore.asRetriever(8); // En alakalı 8 doküman

// 3. Chain Kurulumu
const chain = RunnableSequence.from([
  {
    context: async (input) => {
      const docs = await retriever.invoke(input);
      return docs.map(doc => doc.pageContent).join("\n\n---\n\n");
    },
    question: (input) => input,
  },
  prompt,
  chatModel,
  new StringOutputParser(),
]);

// 4. Çalıştırma
const response = await chain.invoke(userQuestion);
```

### LangChain'in Avantajları

* **Modülerlik:** Her bileşen (loader, splitter, retriever, model) bağımsız ve değiştirilebilir
* **Genişletilebilirlik:** Kolayca yeni veri kaynakları (Web, SQL, API) eklenebilir
* **Standart:** Endüstri standardı, iyi dokümante edilmiş
* **Zincirleme:** Karmaşık iş akışları RunnableSequence ile kolayca kurulur
* **Metadata Yönetimi:** Dokümanlar zengin metadata ile takip edilir

---

## 🎯 Özelleştirme Rehberi

### Kendi CV'nizi Kullanma

1. Kök dizine `cv.pdf` dosyanızı yerleştirin
2. `src/lib/rag.ts` içindeki metadata alanlarını güncelleyin:
   ```typescript
   author: "Kendi Adınız",
   category: "personal_info"
   ```

### Farklı LLM Modeli Kullanma

LangChain sayesinde farklı modellere geçiş çok kolay:

**OpenAI GPT-4:**
```typescript
import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  modelName: "gpt-4-turbo-preview",
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY
});
```

**Anthropic Claude:**
```typescript
import { ChatAnthropic } from "@langchain/anthropic";

const chatModel = new ChatAnthropic({
  modelName: "claude-3-opus-20240229",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY
});
```

**Google Gemini:**
```typescript
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const chatModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  apiKey: process.env.GOOGLE_API_KEY
});
```

### Yeni Veri Kaynakları Ekleme

LangChain'in loaders'ı ile kolayca yeni kaynaklar ekleyebilirsiniz:

```typescript
// Web sayfalarından veri çekme
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const webLoader = new CheerioWebBaseLoader("https://blog.com");
const webDocs = await webLoader.load();

// Markdown dosyaları
import { TextLoader } from "langchain/document_loaders/fs/text";

const markdownLoader = new TextLoader("./README.md");
const mdDocs = await markdownLoader.load();

// Tüm dökümanları birleştir
const allDocs = [...pdfDocs, ...githubDocs, ...webDocs, ...mdDocs];
```

---

## 🐛 Sorun Giderme

### Embedding Modeli İndirilemiyor

İlk çalıştırmada model otomatik indirilir (~50MB). İnternet bağlantınızı kontrol edin.

**Çözüm:**
```bash
# Cache'i temizle
rm -rf node_modules/.cache/
npm run dev
```

### LanceDB Veritabanı Bozuldu

Veritabanını yeniden oluşturmak için:
```bash
rm -rf .lancedb/
npm run dev  # Otomatik yeniden oluşturulur
```

### DeepSeek API Hatası

API anahtarınızı kontrol edin:
```bash
# .env dosyasında
DEEPSEEK_API_KEY=sk-...  # "Bearer" ön eki KULLANMAYIN
```

### Vercel Deploy Hatası

`next.config.ts` dosyasının doğru yapılandırıldığından emin olun:
```typescript
module.exports = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
};
```

---

## 🚢 Production'a Alma (Vercel)

1. **Proje Hazırlığı:**
   ```bash
   npm run build  # Lokal build testi
   ```

2. **Environment Variables:** Vercel Dashboard'da ekleyin:
   - `DEEPSEEK_API_KEY`
   - `GITHUB_USERNAME`
   - `GITHUB_TOKEN` (opsiyonel)

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **İlk Deploy Sonrası:**
   - `.lancedb` klasörü otomatik oluşur
   - Cold start ~5-10 saniye sürebilir (embedding modeli yükleme)
   - Sonraki istekler çok daha hızlı olacaktır

---

## 🔐 Güvenlik Notları

* **API Anahtarları:** Asla commit etmeyin, `.env` kullanın ve `.gitignore`'da olduğundan emin olun
* **Rate Limiting:** Production'da chat endpoint'ine rate limit ekleyin
* **Input Validation:** Kullanıcı inputlarını validate edin (maksimum uzunluk, sanitize)
* **CORS:** Sadece kendi domain'inizden gelen istekleri kabul edin

---

## 📚 Kaynaklar ve Öğrenme

* **LangChain Docs:** https://js.langchain.com/docs/
* **LanceDB Docs:** https://lancedb.github.io/lancedb/
* **Next.js App Router:** https://nextjs.org/docs/app
* **DeepSeek API:** https://platform.deepseek.com/docs
* **Hugging Face Transformers:** https://huggingface.co/docs/transformers.js/

---

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır! Büyük değişiklikler için önce bir issue açın.

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📝 Değişiklik Geçmişi

### v2.0.0 - LangChain Migration 🎉
- ✨ Tamamen LangChain framework'üne geçiş
- ✨ Modüler RAG pipeline (RunnableSequence)
- ✨ LangChain PDFLoader ve RecursiveCharacterTextSplitter
- ✨ HuggingFaceTransformersEmbeddings entegrasyonu
- ✨ Gelişmiş metadata yönetimi
- ✨ Daha kolay model değiştirme (ChatOpenAI interface)

### v1.0.0 - Initial Release
- 💬 Temel chatbot
- 🧠 LanceDB vektör veritabanı
- 🔗 GitHub entegrasyonu
- 📄 PDF işleme

---

## 📜 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. İstediğiniz gibi kullanabilir ve geliştirebilirsiniz.

---

## 👨‍💻 Geliştirici

**Mehmet Burçhan Gürses**

Sorularınız için Issues bölümünü kullanabilirsiniz.

---

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**