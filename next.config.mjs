/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    domains: ["i.scdn.co"],
  },
  experimental: {
    appDir: true,
  },
};

// Merge MDX config with Next.js config
export default nextConfig;
