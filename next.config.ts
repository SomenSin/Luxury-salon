import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Luxury-salon',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
