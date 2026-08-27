import type { ScannerRule } from "../../types";

export const assetAnalysis: ScannerRule = ({ files }) =>
  files
    .filter(
      (f) =>
        /\.(png|jpe?g|gif|webp|mp4|mov)$/i.test(f.relativePath) &&
        f.size > 2 * 1024 * 1024,
    )
    .map((f) => ({
      ruleId: "PERF-002",
      severity: "LOW" as const,
      category: "PERFORMANCE" as const,
      title: "Large frontend asset",
      description:
        "A frontend media asset exceeds 2 MB and may negatively affect page load performance.",
      file: f.relativePath,
      recommendation:
        "Optimize the asset, use modern compression, responsive variants, or CDN delivery where appropriate.",
    }));