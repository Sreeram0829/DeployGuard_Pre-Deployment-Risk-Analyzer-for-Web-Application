import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const packageValidation: ScannerRule = ({ files, packageJson }) => {
  const p = files.find((f) => f.relativePath === "package.json");

  if (!p) {
    return [
      {
        ruleId: "DEP-001",
        severity: "MEDIUM",
        category: "DEPENDENCIES",
        title: "package.json not found",
        description:
          "A Node.js package manifest was not found. If this is a Node-based web application, dependency metadata may be incomplete.",
        recommendation:
          "Add a valid package.json with runtime dependencies and scripts required by the deployment platform.",
      },
    ];
  }

  const out: Finding[] = [];
  const scripts = (packageJson?.scripts || {}) as Record<string, unknown>;

  if (!scripts || typeof scripts !== "object") {
    out.push({
      ruleId: "DEP-001",
      severity: "MEDIUM",
      category: "DEPENDENCIES",
      title: "Invalid scripts configuration",
      description:
        "The package manifest does not expose a valid scripts object.",
      file: p.relativePath,
      recommendation:
        "Define a valid scripts object and include the commands required by your deployment platform.",
    });
  }

  return out;
};