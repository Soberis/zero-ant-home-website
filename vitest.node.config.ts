import { defineConfig } from "vitest/config";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  test: {
    include: ["tests/node/**/*.test.ts"],
    environment: "node",
  },
});
