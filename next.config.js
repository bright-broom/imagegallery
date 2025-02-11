/** @type {import('next').NextConfig} */
const nextConfig = {
  // 📌 Next.js の画像最適化設定
  images: {
    formats: ["image/avif", "image/webp"], // ✅ AVIF/WebP に対応し、パフォーマンスを向上
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dcxm6aef0/**", // ✅ `dcxm6aef0` → 自分の Cloudinary `cloud_name` に変更
      },
    ],
    domains: ["res.cloudinary.com"], // ✅ `next/image` で Cloudinary の画像を許可
  },

  // 📌 環境変数（`process.env` 経由で取得）
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  },

  // 📌 `fs` モジュールを無効化（クライアントサイドのエラー回避）
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },

  // 📌 Next.js の厳格モードを有効化（開発時のバグ検出を強化）
  reactStrictMode: true,
};

module.exports = nextConfig;
