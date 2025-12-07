import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages用の静的エクスポート設定
  output: 'export',
  
  // GitHub Pagesのリポジトリ名をbasePathに設定
  basePath: '/simon_enterprise_moc',
  
  // 画像最適化を無効化（GitHub Pagesでは動かないため）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
