import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
  env: {
    BACKEND_URI: process.env.NEXT_BACKEND_URI
  }
};

export default nextConfig;
