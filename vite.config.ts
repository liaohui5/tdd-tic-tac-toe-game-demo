/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
