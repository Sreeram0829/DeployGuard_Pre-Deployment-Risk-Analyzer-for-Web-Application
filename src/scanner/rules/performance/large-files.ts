import type { ScannerRule } from "../../types";

export const largeFiles: ScannerRule = ({ files }) =>
  files
    .filter((f) => f.size > 5 * 1024 * 1024)
    .map((f) => ({
      ruleId: "PERF-001",
      severity: "MEDIUM" as const,
      category: "PERFORMANCE" as const,
      title: "Large file detected",
      description:
        "A source/archive/asset file is larger than 5 MB and may increase repository, upload, or deployment costs.",
      file: f.relativePath,
      recommendation:
        "Compress, optimize, split, or move large artifacts out of the application bundle where appropriate.",
    }));