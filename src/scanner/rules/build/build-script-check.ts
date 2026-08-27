import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const buildScriptCheck: ScannerRule = ({ packageJson }) => {
  const scripts = packageJson?.scripts as
    | Record<string, unknown>
    | undefined;

  if (!packageJson) return [];

  if (!scripts?.build) {
    return [
      {
        ruleId: "BLD-001",
        severity: "HIGH",
        category: "BUILD",
        title: "Build script is missing",
        description:
          "package.json does not define a build script, so common deployment platforms may not know how to produce a production bundle.",
        file: "package.json",
        recommendation:
          "Add a deterministic production build script such as next build, vite build, or the framework-specific equivalent.",
      },
    ];
  }

  return [];
};