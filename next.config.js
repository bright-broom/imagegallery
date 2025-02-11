/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], // 画像フォーマットの最適化
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dcxm6aef0/**", // `dcxm6aef0` を自分の Cloudinary `cloud_name` に変更
      },
    ],
    domains: ["res.cloudinary.com"], // `next/image` で Cloudinary の画像を許可
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
