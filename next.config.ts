import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Set to /Luxury-salon for GH Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
