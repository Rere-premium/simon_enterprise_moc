import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 本番環境（GitHub Pages用）の設定
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    // GitHub Pagesのリポジトリ名をbasePathに設定
    basePath: '/simon_enterprise_moc',
  }),
  
  // 画像最適化を無効化（GitHub Pagesでは動かないため）
  images: {
    unoptimized: true,
  },
  
  // Turbopack設定（Next.js 16ではTurbopackがデフォルト）
  turbopack: {
    // 空の設定でエラーを回避
  },
};

export default nextConfig;
