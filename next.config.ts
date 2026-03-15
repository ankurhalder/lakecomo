import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/themes", destination: "/#story", permanent: true },
      { source: "/cast", destination: "/#experience", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/crew", destination: "/", permanent: true },
      { source: "/gallery", destination: "/", permanent: true },
      { source: "/movie", destination: "/", permanent: true },
      { source: "/process", destination: "/", permanent: true },
      { source: "/venue", destination: "/", permanent: true },
      { source: "/faq", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
