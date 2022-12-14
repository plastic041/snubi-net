/* eslint-disable spaced-comment */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      all: true,
      exclude: [
        "**/node_modules/**",
        "**/.next/**",
        "next-env.d.ts",
        "next.config.js",
        "postcss.config.js",
        "tailwind.config.js",
        "vitest.config.ts",
        "prettier.config.js",
        "**/*.d.ts",
      ],
    },
    globals: true,
    setupFiles: "./tests/setup.ts",
    exclude: ["**/node_modules/**", "**/.next/**", "**/e2e/**"],
    include: ["tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  resolve: {
    alias: {
      "~/": `${resolve(__dirname)}/src/`,
    },
  },
});
