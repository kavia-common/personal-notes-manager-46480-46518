import type { NextConfig } from "next";

// Respect telemetry disable flag if provided
if (process.env.NEXT_PUBLIC_NEXT_TELEMETRY_DISABLED === "1" || process.env.NEXT_PUBLIC_NEXT_TELEMETRY_DISABLED === "true") {
  process.env.NEXT_TELEMETRY_DISABLED = "1";
}

const nextConfig: NextConfig = {
  // Static export for preview friendliness and to allow simple static serving
  output: "export",
};

export default nextConfig;
