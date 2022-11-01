/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    domains: ["i.scdn.co"],
  },
};

module.exports = nextConfig;
