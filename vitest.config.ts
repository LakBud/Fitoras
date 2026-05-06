import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
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
