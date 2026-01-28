export async function register() {
  // Sadece Node.js sunucu tarafında çalışsın (Edge veya tarayıcıda değil)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('🏁 Sunucu Başlatılıyor... Vektör Motoru Isıtılıyor...');
    
    // RAG kütüphanemizi dinamik import ile çağırıyoruz
    const { getVectorStore } = await import('./lib/rag');
    
    // Fonksiyonu çalıştırarak işlemleri başlatıyoruz
    await getVectorStore();
    
    console.log('✅ Sunucu Başlangıç Kontrolleri Tamamlandı!');
  }
}