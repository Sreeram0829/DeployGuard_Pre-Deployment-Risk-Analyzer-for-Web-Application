import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const configValidation: ScannerRule = ({ files }) => {
  const out: Finding[] = [];

  const config = files.find((file) =>
    /^(next\.config|vite\.config|webpack\.config|nuxt\.config)\.(js|ts|mjs|cjs)$/.test(
      file.relativePath,
    ),
  );

  if (!config) {
    out.push({
      ruleId: "CFG-003",
      severity: "INFO",
      category: "CONFIGURATION",
      title: "No recognized framework configuration file",
      description:
        "No common framework configuration file was detected. This is informational and may be expected for simpler projects.",
      recommendation:
        "Confirm that the project's deployment configuration is intentionally convention-based.",
    });
  }

  return out;
};