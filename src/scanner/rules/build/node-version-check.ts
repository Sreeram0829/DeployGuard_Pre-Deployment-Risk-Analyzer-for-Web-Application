import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const nodeVersionCheck: ScannerRule = ({ packageJson }) => {
  if (!packageJson) return [];

  const engines = packageJson.engines as
    | Record<string, unknown>
    | undefined;

  if (engines?.node) return [];

  const findings: Finding[] = [
    {
      ruleId: "BLD-003",
      severity: "LOW",
      category: "BUILD",
      title: "Node.js version is not declared",
      description:
        "package.json does not declare an engines.node range. Builds can silently move between runtime versions.",
      file: "package.json",
      recommendation:
        "Declare a supported Node.js major/range and keep local, CI, and production runtimes aligned.",
    },
  ];

  return findings;
};