/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains :['raw.communitydragon.org','ddragon.leagueoflegends.com'],
  },
}

module.exports = nextConfig
