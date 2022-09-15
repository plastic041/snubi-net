/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const widthMDX = require("@next/mdx")({
  extension: /\.mdx.?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = widthMDX(nextConfig);
