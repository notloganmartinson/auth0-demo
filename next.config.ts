import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Keep the TypeScript compiler API path used before Next.js 16.4.
    // The CLI subprocess returns empty output in the restricted build environment.
    // This changes the checking mechanism; TypeScript validation stays enabled.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
