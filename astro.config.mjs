import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://snubi-net.vercel.app/",
  integrations: [tailwind(), react(), mdx(), sitemap()],
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
