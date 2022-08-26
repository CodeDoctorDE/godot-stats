const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
