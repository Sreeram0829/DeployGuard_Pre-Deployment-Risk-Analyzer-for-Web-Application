import {describe,it,expect} from "vitest"; import {localhostDetection} from "@/scanner/rules/configuration/localhost-detection";
describe("configuration rules",()=>{it("finds localhost",()=>expect(localhostDetection({rootDir:"/tmp",files:[{relativePath:"src/a.ts",absolutePath:"/tmp/a.ts",size:20,content:'fetch("http://localhost:3000/api")'}]})).toHaveLength(1));});
