import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { getComponentCount } from "./src/lib/component-count";

// Bundle analyzer for performance monitoring
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Force static export - no server functions

  // Stamped into both bundles at build time. src/constants/navigation.ts judges
  // time-limited "New" badges against it so server and client always agree.
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    // Counted from registry.json, which `npm run build` regenerates before
    // `next build`. Read it as COMPONENT_COUNT from src/config/site.ts.
    NEXT_PUBLIC_REGISTRY_COMPONENT_COUNT: String(getComponentCount()),
  },
  trailingSlash: false,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Skip type and lint checks during build (Vercel deploy)
  // Type and lint errors fail the build. This repo publishes source code as a
  // shadcn registry, so type errors here land in consumers' projects — they
  // must not be suppressed. Warnings are still allowed through.
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // SEO and Performance Optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization for static export
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
    domains: ["i.postimg.cc", "i.pinimg.com", "avatars.githubusercontent.com"],
  },

  // Static export doesn't support headers() or redirects()
  // These will be handled by your hosting provider (Vercel)

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion/react",
      "@radix-ui/react-icons",
    ],
    scrollRestoration: true,
  },

  // Webpack configuration
  webpack: (config) => {
    return config;
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withBundleAnalyzer(withMDX(nextConfig));
