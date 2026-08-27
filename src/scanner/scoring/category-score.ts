import type { Finding, FindingCategory } from "@/types/finding";
import { severityWeights } from "./severity";

export function calculateCategoryScores(
  findings: Finding[],
): Record<FindingCategory, number> {
  const categories: FindingCategory[] = [
    "SECURITY",
    "CONFIGURATION",
    "DEPENDENCIES",
    "BUILD",
    "PERFORMANCE",
  ];

  return Object.fromEntries(
    categories.map((category) => {
      const penalty = findings
        .filter((finding) => finding.category === category)
        .reduce(
          (sum, finding) => sum + severityWeights[finding.severity],
          0,
        );

      return [category, Math.max(0, 100 - penalty)];
    }),
  ) as Record<FindingCategory, number>;
}