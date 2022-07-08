/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  swcMinify: true,
}

module.exports = nextConfig
