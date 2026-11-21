import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://nextjs.org/docs/app/guides/testing/vitest
export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    exclude: [
      "**/node_modules/**",
      "src/lib/presentation/ui/data/feature/support/**/*.test.ts",
      "src/lib/presentation/ui/components/feature/support/**/*.test.ts",
      "src/lib/presentation/ui/components/ui/rich-text-editor/**/*.test.ts",
    ],
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: [
            "src/lib/domain/**/*.test.ts",
            "src/lib/application/**/*.test.ts",
            "src/lib/infrastructure/**/*.test.ts",
            "src/lib/presentation/http/**/*.test.ts",
            "src/app/api/**/*.test.ts",
            "scripts/**/*.test.mjs",
          ],
        },
      },
      {
        extends: true,
        test: {
          name: "jsdom",
          environment: "jsdom",
          include: ["src/lib/**/*.test.{ts,tsx}", "src/app/**/*.test.{ts,tsx}"],
          exclude: [
            "src/lib/domain/**/*.test.ts",
            "src/lib/application/**/*.test.ts",
            "src/lib/infrastructure/**/*.test.ts",
            "src/lib/presentation/http/**/*.test.ts",
            "src/app/api/**/*.test.ts",
            "src/lib/presentation/ui/data/feature/support/**/*.test.ts",
            "src/lib/presentation/ui/components/feature/support/**/*.test.ts",
            "src/lib/presentation/ui/components/ui/rich-text-editor/**/*.test.ts",
          ],
        },
      },
    ],
    coverage: {
      provider: "v8",
      include: ["src/lib/**/*.{ts,tsx}"],
      exclude: ["**/*.test.{ts,tsx}", "**/index.ts"],
    },
  },
});
