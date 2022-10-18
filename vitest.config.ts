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
    setupFiles: "./__tests__/setup.ts",
    exclude: ["**/node_modules/**", "**/.next/**", "**/__tests__e2e/**"],
  },
  resolve: {
    alias: {
      "~/": `${resolve(__dirname)}/src/`,
    },
  },
});
