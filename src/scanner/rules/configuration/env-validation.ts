import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const envValidation: ScannerRule = ({ files }) => {
  const hasExample = files.some(
    (f) =>
      f.relativePath === ".env.example" ||
      f.relativePath.endsWith("/.env.example"),
  );

  const hasEnv = files.some((f) => /^\.env$/.test(f.relativePath));

  if (hasEnv && !hasExample) {
    return [
      {
        ruleId: "CFG-002",
        severity: "LOW",
        category: "CONFIGURATION",
        title: "No .env.example found",
        description:
          "The project contains an environment file but no example configuration documenting expected variables was found.",
        recommendation:
          "Add a sanitized .env.example with variable names only, never real secrets.",
      },
    ];
  }

  return [];
};