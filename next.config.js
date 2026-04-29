/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // autorise toutes les images externes
    ],
  },
}

module.exports = nextConfig
