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
    BACKEND_URI: process.env.NEXT_BACKEND_URI,
    EMAIL_SERVICE_ID: process.env.NEXT_EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID: process.env.NEXT_EMAIL_TEMPLATE_ID,
    EMAIL_PUBLIC_KEY: process.env.NEXT_EMAIL_PUBLIC_KEY
  }
};

export default nextConfig;
