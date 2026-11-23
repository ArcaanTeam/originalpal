import type { NextConfig } from "next";
import { assertRequiredEnv } from "@/lib/infrastructure/env";

// Next loads .env before evaluating this file.
assertRequiredEnv();

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["pg"],
  reactCompiler: true,
};

export default nextConfig;
