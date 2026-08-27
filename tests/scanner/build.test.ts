import { describe, expect, it } from "vitest";
import { buildScriptCheck } from "@/scanner/rules/build/build-script-check";
import { nodeVersionCheck } from "@/scanner/rules/build/node-version-check";

describe("build rules", () => {
  it("requires build script", async () => {
    const findings = await Promise.resolve(
      buildScriptCheck({
        rootDir: "/tmp",
        files: [],
        packageJson: { scripts: {} },
      }),
    );

    expect(findings[0]?.ruleId).toBe("BLD-001");
  });

  it("flags missing node version", async () => {
    const findings = await Promise.resolve(
      nodeVersionCheck({
        rootDir: "/tmp",
        files: [],
        packageJson: { scripts: { build: "next build" } },
      }),
    );

    expect(findings[0]?.ruleId).toBe("BLD-003");
  });
});