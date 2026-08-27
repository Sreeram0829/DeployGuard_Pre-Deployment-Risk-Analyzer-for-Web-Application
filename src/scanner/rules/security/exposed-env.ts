import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const exposedEnv: ScannerRule = ({ files }) => {
  const findings: Finding[] = files
    .filter(
      (f) =>
        /^\.env(?:\..+)?$/.test(f.relativePath) &&
        !f.relativePath.includes(".example"),
    )
    .map((f) => ({
      ruleId: "SEC-002",
      severity: "HIGH",
      category: "SECURITY",
      title: "Environment file is included in project source",
      description:
        "A non-example .env file is present in the uploaded project. Environment files commonly contain secrets and should not be deployed or committed.",
      file: f.relativePath,
      recommendation:
        "Remove the file from source control and deployment artifacts; use platform-managed environment variables instead.",
    }));

  return findings;
};