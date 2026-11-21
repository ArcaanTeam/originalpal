import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Integration tests read DATABASE_URL from .env (Node built-in loader).
try {
  process.loadEnvFile();
} catch {
  // No .env file.
}

vi.mock("server-only", () => ({}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));
