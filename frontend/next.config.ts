import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Portfolio",
  assetPrefix: "/Portfolio/",
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@splinetool/react-spline'],
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
