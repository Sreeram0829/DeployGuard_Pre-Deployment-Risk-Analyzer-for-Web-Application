import type { Finding } from "../../../types/finding";
import type { ScannerRule } from "../../types";

export const localhostDetection: ScannerRule = ({ files }) => {
  const out: Finding[] = [];

  for (const f of files) {
    if (!f.content) continue;

    const re =
      /https?:\/\/localhost(?::\d+)?|\blocalhost(?::\d+)?/gi;

    const m = re.exec(f.content);

    if (m) {
      out.push({
        ruleId: "CFG-001",
        severity: "MEDIUM",
        category: "CONFIGURATION",
        title: "Hardcoded localhost URL",
        description:
          "A localhost URL is referenced in project source/configuration and may fail outside local development.",
        file: f.relativePath,
        line: f.content.slice(0, m.index).split("\n").length,
        evidence: m[0],
        recommendation:
          "Move environment-specific URLs into configuration and verify production values before deployment.",
      });
    }
  }

  return out;
};