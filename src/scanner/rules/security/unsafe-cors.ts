import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const unsafeCors: ScannerRule = ({ files }) => {
  const findings: Finding[] = [];

  for (const f of files) {
    if (!f.content) continue;

    const re =
      /(Access-Control-Allow-Origin|origin)\s*[:=]\s*["'`]\*["'`]/i;

    if (re.test(f.content)) {
      findings.push({
        ruleId: "SEC-003",
        severity: "HIGH",
        category: "SECURITY",
        title: "Wildcard CORS origin detected",
        description:
          "The project appears to allow cross-origin requests from any origin. This can be unsafe when credentials or sensitive APIs are involved.",
        file: f.relativePath,
        recommendation:
          "Restrict allowed origins to the domains that actually need access and avoid wildcard origins for credentialed requests.",
      });
    }
  }

  return findings;
};