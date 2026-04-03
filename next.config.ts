import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/quest-walk',
  assetPrefix: '/quest-walk',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/quest-walk',
  },
};

export default nextConfig;
