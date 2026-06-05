const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.angelx.exchange" }],
        destination: "https://angelx.exchange/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/terms&conditions",
          destination: "/terms-conditions",
        },
      ],
    };
  },
};

module.exports = nextConfig;
