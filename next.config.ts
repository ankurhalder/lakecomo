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
        destination: 'https://webmail.lakecomostyle.it',
        permanent: true,
      },
      {
        source: '/cpanel',
        destination: 'https://server322.web-hosting.com/cpanel',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;