import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. DÜZELTME: 'serverExternalPackages' kök dizinde olmalı (Next.js 15+ standardı).
  // Bu paketleri bundle etme, node_modules'den olduğu gibi kullan diyoruz.
  serverExternalPackages: ['@xenova/transformers', 'onnxruntime-node', '@lancedb/lancedb'],

  // 2. DÜZELTME: 'outputFileTracingExcludes' artık 'experimental' içinde değil, kök dizinde.
  outputFileTracingExcludes: {
    '*': [
      // Windows ve Mac dosyalarını Vercel'e yükleyip boşuna yer kaplama (Limit: 50MB/250MB).
      './node_modules/@lancedb/lancedb-win32-x64-msvc',
      './node_modules/@lancedb/lancedb-darwin-x64',
      './node_modules/@lancedb/lancedb-darwin-arm64',
      
      // Vercel standart Linux (glibc) kullanır. Alpine Linux (musl) kütüphanesini dışlıyoruz.
      './node_modules/@lancedb/lancedb-linux-x64-musl',
      
      // NOT: './node_modules/@lancedb/lancedb-linux-x64-gnu' BURAYA YAZILMAMALI!
      // Vercel'in çalışması için o dosyaya ihtiyacı var.
    ],
  },

  // 3. Webpack ayarı (Client tarafında hata almamak için aynen kalıyor)
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