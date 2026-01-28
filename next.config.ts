import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Bu paketleri webpack bundle'ına dahil etme (Server-side çalışsınlar)
  serverExternalPackages: ['@huggingface/transformers', '@xenova/transformers', 'onnxruntime-node', '@lancedb/lancedb'],

  // 2. Vercel Output Tracing (Gereksiz Dosya Temizliği)
  outputFileTracingExcludes: {
    '*': [
      // --- ONNX RUNTIME TEMİZLİĞİ (En Büyük Yer Kaplayanlar) ---
      // Vercel Linux x64 kullanır. Diğerlerini siliyoruz. (~350MB Tasarruf)
      './node_modules/onnxruntime-node/bin/napi-v3/darwin-arm64', // Mac M1/M2
      './node_modules/onnxruntime-node/bin/napi-v3/darwin-x64',   // Mac Intel
      './node_modules/onnxruntime-node/bin/napi-v3/win32-x64',     // Windows
      './node_modules/onnxruntime-node/bin/napi-v3/linux-arm64',  // Linux ARM (AWS Graviton vb.)
      
      // --- LANCEDB TEMİZLİĞİ ---
      './node_modules/@lancedb/lancedb-linux-x64-musl', // Alpine Linux
      './node_modules/@lancedb/lancedb-win32-x64-msvc', // Windows
      './node_modules/@lancedb/lancedb-darwin-x64',     // Mac
      './node_modules/@lancedb/lancedb-darwin-arm64',   // Mac M1/M2
      
      // --- SHARP (Resim İşleme - Varsa) ---
      './node_modules/sharp/build/Release/sharp-linux-x64.node', // Eğer kullanmıyorsan
      './node_modules/@img/sharp-libvips-linuxmusl-x64',
      './node_modules/@img/sharp-libvips-darwin-x64',
      './node_modules/@img/sharp-libvips-darwin-arm64',
      './node_modules/@img/sharp-libvips-win32-x64',
    ],
  },

  // 3. Webpack Client Ayarları
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
    }
    return config;
  },
};

export default nextConfig;