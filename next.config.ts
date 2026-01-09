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
      {
        source: '/webmail',
        destination: 'webmail.lakecomostyle.it',
        permanent: true,
      },
      {
        source: '/cpanel',
        destination: 'https://lakecomostyle.it:2083',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;