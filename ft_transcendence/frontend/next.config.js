/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: "/app",
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "social-service",
        port: "3000",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;