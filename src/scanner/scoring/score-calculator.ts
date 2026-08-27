import type { Finding, Severity } from "@/types/finding";
import { calculatePenalty } from "./severity";
import { calculateCategoryScores } from "./category-score";

export function calculateScore(findings: Finding[]) {
  const severityCounts: Record<Severity, number> = {
    CRITICAL: 0,
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0,
    INFO: 0,
  };

  for (const finding of findings) {
    severityCounts[finding.severity]++;
  }

  const penalty = findings.reduce(
    (sum, finding) => sum + calculatePenalty(finding.severity),
    0,
  );

  return {
    score: Math.max(0, Math.min(100, 100 - penalty)),
    severityCounts,
    categoryScores: calculateCategoryScores(findings),
  };
}