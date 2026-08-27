import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

const patterns: [RegExp, string][] = [
  [
    /(api[_-]?key|secret|token|password)\s*[:=]\s*["'`]([^"'`\n]{12,})["'`]/gi,
    "Hardcoded credential-like value",
  ],
  [/AKIA[0-9A-Z]{16}/g, "AWS access key format"],
  [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    "Private key material",
  ],
];

export const secretDetection: ScannerRule = ({ files }) => {
  const findings: Finding[] = [];

  for (const f of files) {
    if (!f.content) continue;

    for (const [re, label] of patterns) {
      re.lastIndex = 0;
      const m = re.exec(f.content);

      if (m) {
        const line = f.content.slice(0, m.index).split("\n").length;

        findings.push({
          ruleId: "SEC-001",
          severity: "CRITICAL",
          category: "SECURITY",
          title: "Potential exposed secret",
          description: `${label} was detected in source code. Treat the value as compromised and move it to a protected runtime secret.`,
          file: f.relativePath,
          line,
          evidence: m[0].slice(0, 160),
          recommendation:
            "Remove the hardcoded value, rotate it if real, and load it through environment or secret-management configuration.",
        });
      }
    }
  }

  return findings;
};