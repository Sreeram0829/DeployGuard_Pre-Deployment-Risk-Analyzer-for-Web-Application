import { describe, expect, it } from "vitest";
import { lockfileValidation } from "@/scanner/rules/dependencies/lockfile-validation";
import { packageValidation } from "@/scanner/rules/dependencies/package-validation";

describe("dependency rules", () => {
  it("flags missing lockfile", async () => {
    const findings = await Promise.resolve(
      lockfileValidation({
        rootDir: "/tmp",
        packageJson: {},
        files: [
          {
            relativePath: "package.json",
            absolutePath: "/tmp/package.json",
            size: 1,
          },
        ],
      }),
    );

    expect(findings).toHaveLength(1);
  });

  it("flags missing package manifest", async () => {
    const findings = await Promise.resolve(
      packageValidation({
        rootDir: "/tmp",
        files: [],
      }),
    );

    expect(findings[0]?.ruleId).toBe("DEP-001");
  });
});