import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const lockfileValidation: ScannerRule = ({ files }) => {
  const hasPkg = files.some((f) => f.relativePath === "package.json");

  if (!hasPkg) return [];

  const lock = files.some((f) =>
    [
      "package-lock.json",
      "pnpm-lock.yaml",
      "yarn.lock",
      "bun.lockb",
      "bun.lock",
    ].includes(f.relativePath),
  );

  if (lock) return [];

  return [
    {
      ruleId: "DEP-002",
      severity: "LOW",
      category: "DEPENDENCIES",
      title: "Dependency lockfile missing",
      description:
        "No recognized package-manager lockfile was found. Unlocked dependencies can reduce reproducibility between builds.",
      recommendation:
        "Commit the lockfile produced by the package manager used in CI and production.",
    },
  ];
};