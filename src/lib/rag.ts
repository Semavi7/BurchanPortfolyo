import path from "path";
import fs from "fs";
import * as lancedb from "@lancedb/lancedb";
import { LanceDB } from "@langchain/community/vectorstores/lancedb";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { fetchGithubRepos } from "./github";
import { Document as LCDocument } from "@langchain/core/documents";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

// Vercel serverless ortaminda process.cwd() read-only'dir.
// /tmp dizini yazilabilir (max 512MB).
const LANCE_DB_PATH = process.env.VERCEL
  ? "/tmp/.lancedb"
  : path.join(process.cwd(), ".lancedb");

export async function getVectorStore() {
  
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001", 
    apiKey: process.env.GOOGLE_API_KEY
  });

  const db = await lancedb.connect(LANCE_DB_PATH);
  const tableNames = await db.tableNames();

  if (tableNames.includes("vectors")) {
    const table = await db.openTable("vectors");
    return new LanceDB(embeddings, { table });
  }

  console.log("📂 Veritabanı bulunamadı. PDF okunuyor ve oluşturuluyor...");

  const pdfPath = path.join(process.cwd(), "cv.pdf");
  if (!fs.existsSync(pdfPath)) {
    throw new Error("CV.pdf dosyası kök dizinde bulunamadı!");
  }

  const loader = new PDFLoader(pdfPath);
  const docs = await loader.load();

  console.log("🌐 GitHub projeleri çekiliyor...");
  const repos = await fetchGithubRepos();
  
  const githubDocs = repos.map((proj: any) => {
    return new LCDocument({
      pageContent: `
        GITHUB PROJESİ: ${proj.title}
        AÇIKLAMA: ${proj.description}
        TEKNOLOJİLER: ${proj.tech}
        YILDIZ SAYISI: ${proj.stars}
        LİNK: ${proj.link}
        BU PROJE MEHMET BURÇHAN GÜRSES TARAFINDAN GELİŞTİRİLMİŞTİR.
      `.trim(),
      metadata: { 
        source: "github",
        title: proj.title,
        type: "project"
      }
    });
  });

  const allDocs = [...docs, ...githubDocs];

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  
  const splitDocs = await splitter.splitDocuments(allDocs);
  console.log(`🧩 Toplam ${splitDocs.length} parça oluşturuldu (PDF + GitHub).`);

  
  const cleanDocs = splitDocs.map((doc) => {
    // Mevcut metadatayı al
    const rawMetadata = doc.metadata;

    // LangChain PDFLoader genellikle sayfa bilgisini 'loc.pageNumber' içinde tutar
    // Ancak bazen direkt metadata içine de atabilir. Kontrollü gidelim.
    const pageNumber = rawMetadata.loc?.pageNumber || rawMetadata.pdf?.totalPages || 1;

    // Yeni, temiz ve düz (flat) bir metadata objesi oluşturuyoruz
    const refinedMetadata = {
      // Orijinal metinle ilgili ID (opsiyonel ama iyi pratiktir)
      id: `${rawMetadata.source || 'cv'}_pg${pageNumber}_${Math.random().toString(36).substring(7)}`,
      
      // Kaynak Tipi (GitHub ile karışmaması için kritik)
      type: "cv_document", 
      
      // Hangi sayfada olduğu (AI'ın referans vermesini sağlar)
      page: pageNumber,
      
      // Dosya adı
      source: "cv.pdf",
      
      // Belgenin sahibi (sabit bilgi)
      author: "Mehmet Burçhan Gürses",
      
      // İleride "sadece CV'de ara" filtresi yapmak istersen
      category: "personal_info"
    };

    return {
      ...doc,
      metadata: refinedMetadata, // Eski karmaşık metadata yerine bunu koyuyoruz
    };
  });
  // -------------------------------------

  const vectorStore = await LanceDB.fromDocuments(cleanDocs, embeddings, {
    uri: LANCE_DB_PATH,
    tableName: "vectors"
  });
  
  console.log(`💾 Veriler LanceDB'ye (${LANCE_DB_PATH}) kaydedildi.`);
  return vectorStore;
}