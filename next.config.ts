import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sadece LanceDB'yi harici tutuyoruz, diğerleri zaten silindi.
  serverExternalPackages: ['@lancedb/lancedb'],

  // LanceDB'nin gereksiz dosyalarini yine de temizleyelim (Tedbir)
  outputFileTracingExcludes: {
    '*': [
      './node_modules/@lancedb/lancedb-linux-x64-musl',
      './node_modules/@lancedb/lancedb-win32-x64-msvc',
      './node_modules/@lancedb/lancedb-darwin-x64',
      './node_modules/@lancedb/lancedb-darwin-arm64',
    ],
  },

  // cv.pdf'in Vercel serverless function bundle'ina dahil edilmesini sagla
  outputFileTracingIncludes: {
    '*': [
      './cv.pdf', 
      './.lancedb/**/*' // Bunu ekledik!
    ],
  },

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
