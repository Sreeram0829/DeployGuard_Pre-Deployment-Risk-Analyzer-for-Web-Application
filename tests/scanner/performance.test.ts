import {describe,it,expect} from "vitest"; import {largeFiles} from "@/scanner/rules/performance/large-files";
describe("performance rules",()=>{it("flags large files",()=>expect(largeFiles({rootDir:"/tmp",files:[{relativePath:"public/video.mp4",absolutePath:"/tmp/video.mp4",size:6*1024*1024}]})).toHaveLength(1));});
