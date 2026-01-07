import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Vite alias
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "/tests/setup.ts",

    // Include tests both in src/ and outside in tests/
    include: ["src/**/*.test.{ts,tsx,js,jsx}", "tests/**/*.test.{ts,tsx,js,jsx}"],

    // Vitest alias
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
