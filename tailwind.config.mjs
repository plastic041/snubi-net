/* eslint-disable @typescript-eslint/no-var-requires */
const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all icon collections you have installed
      collections: getIconCollections(["tabler"]),
    }),
  ],
};
