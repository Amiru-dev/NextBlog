import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Allow both App Router and Pages Router
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
