// ESLint flat config for Astro + TypeScript + React, no FlatCompat, using direct imports
import globals from "globals";
import astroPlugin from "eslint-plugin-astro";
import reactPlugin from "eslint-plugin-react";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // React rules for TS/TSX
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      reactPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },

  // Astro recommended rules
  ...astroPlugin.configs.recommended,

  // Global ignores
  {
    ignores: [".astro/**/*", ".vercel/**/*"],
  }
);
