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
        source: '/:path*',
        has: [{ type: 'host', value: 'webmail.lakecomostyle.it' }],
        destination: 'https://server123.web-hosting.com:2096/:path*',
        permanent: true,
      },
      {
        source: '/webmail',
        destination: 'https://server123.web-hosting.com:2096',
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