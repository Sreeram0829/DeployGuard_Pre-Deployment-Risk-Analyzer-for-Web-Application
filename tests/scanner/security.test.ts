import {describe,it,expect} from "vitest"; import {secretDetection,unsafeCors} from "@/scanner/rules/security/secret-detection";
import {exposedEnv as envRule} from "@/scanner/rules/security/exposed-env";
const ctx=(content:string)=>({rootDir:"/tmp",files:[{relativePath:"src/config.ts",absolutePath:"/tmp/src/config.ts",size:content.length,content}]});
describe("security rules",()=>{it("detects credential-like values",()=>expect(secretDetection(ctx('const token = "abcdefghijklmnop";'))[0].ruleId).toBe("SEC-001"));it("detects wildcard cors",()=>expect(unsafeCors(ctx('origin: "*"'))[0].severity).toBe("HIGH"));it("detects env files",()=>expect(envRule({rootDir:"/tmp",files:[{relativePath:".env",absolutePath:"/tmp/.env",size:20}]})).toHaveLength(1));});
