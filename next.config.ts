import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/quest-walk',
  assetPrefix: '/quest-walk',
};

export default nextConfig;
