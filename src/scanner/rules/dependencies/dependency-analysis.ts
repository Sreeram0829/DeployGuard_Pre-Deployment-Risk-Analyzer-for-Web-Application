import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const dependencyAnalysis: ScannerRule = ({
  packageJson,
  files,
}) => {
  const deps = {
    ...((packageJson?.dependencies as Record<string, unknown>) || {}),
    ...((packageJson?.devDependencies as Record<string, unknown>) || {}),
  };

  const out: Finding[] = [];

  if (Object.keys(deps).length > 200) {
    out.push({
      ruleId: "DEP-003",
      severity: "LOW",
      category: "DEPENDENCIES",
      title: "Very large dependency manifest",
      description:
        "The project declares more than 200 direct dependencies, which can increase install time and maintenance surface.",
      file: "package.json",
      recommendation:
        "Review unused direct dependencies and keep the production dependency surface intentional.",
    });
  }

  return out;
};