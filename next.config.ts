import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // pdfjs-dist optionally requires canvas — stub it out so Turbopack doesn't fail
  turbopack: {
    resolveAlias: {
      canvas: { browser: "./empty.js" },
    },
  },
};

export default nextConfig;
