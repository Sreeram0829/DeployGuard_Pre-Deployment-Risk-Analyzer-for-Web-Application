import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const frameworkDetection: ScannerRule = ({ packageJson }) => {
  if (!packageJson) return [];

  const deps = {
    ...((packageJson.dependencies as Record<string, unknown>) || {}),
    ...((packageJson.devDependencies as Record<string, unknown>) || {}),
  };

  const known = [
    "next",
    "react",
    "vite",
    "nuxt",
    "@angular/core",
    "svelte",
    "astro",
  ];

  const found = known.find((framework) => framework in deps);

  if (found) return [];

  const findings: Finding[] = [
    {
      ruleId: "BLD-002",
      severity: "INFO",
      category: "BUILD",
      title: "Framework could not be identified",
      description:
        "No recognized web framework dependency was detected in package.json.",
      file: "package.json",
      recommendation:
        "Confirm that the project is supported by its intended deployment configuration or document the custom build process.",
    },
  ];

  return findings;
};