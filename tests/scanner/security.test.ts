import { describe, expect, it } from "vitest";
import { secretDetection } from "@/scanner/rules/security/secret-detection";
import { unsafeCors } from "@/scanner/rules/security/unsafe-cors";
import { exposedEnv as envRule } from "@/scanner/rules/security/exposed-env";

const ctx = (content: string) => ({
  rootDir: "/tmp",
  files: [
    {
      relativePath: "src/config.ts",
      absolutePath: "/tmp/src/config.ts",
      size: content.length,
      content,
    },
  ],
});

describe("security rules", () => {
  it("detects credential-like values", async () => {
    const findings = await Promise.resolve(
      secretDetection(ctx('const token = "abcdefghijklmnop";')),
    );

    expect(findings[0]?.ruleId).toBe("SEC-001");
  });

  it("detects wildcard cors", async () => {
    const findings = await Promise.resolve(
      unsafeCors(ctx('origin: "*"')),
    );

    expect(findings[0]?.severity).toBe("HIGH");
  });

  it("detects env files", async () => {
    const findings = await Promise.resolve(
      envRule({
        rootDir: "/tmp",
        files: [
          {
            relativePath: ".env",
            absolutePath: "/tmp/.env",
            size: 20,
          },
        ],
      }),
    );

    expect(findings).toHaveLength(1);
  });
});