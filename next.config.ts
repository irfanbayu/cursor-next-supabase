import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Enable modern React features
    optimizePackageImports: ["react", "react-dom"],
  },
  // Ensure proper static generation
  output: "standalone",
  // Enable proper error handling for Suspense boundaries
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
