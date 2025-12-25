import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const nextConfig: NextConfig = {
  // Removed static export for dynamic routes to work
  // output: "export",
  // trailingSlash: true,
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  // Enable experimental features for better subdomain support
  experimental: {
    // serverActions: true,
  },

  // Allow multiple domains/subdomains
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
