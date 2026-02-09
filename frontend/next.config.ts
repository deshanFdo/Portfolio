import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@splinetool/react-spline'],
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
