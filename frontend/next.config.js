/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["storage.googleapis.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",

  KAKAO_API_KEY: process.env.KAKAO_API_KEY,
};

module.exports = nextConfig;
