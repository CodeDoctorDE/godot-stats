const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  swcMinify: true,
  pwa: {
    dest: 'public'
  }
}

module.exports = withPWA(nextConfig)
