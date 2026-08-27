import type {Finding,FindingCategory,Severity} from "./finding";
export interface ScanResult{score:number;findings:Finding[];severityCounts:Record<Severity,number>;categoryScores:Record<FindingCategory,number>;filesScanned:number;}
export type ScanStatus="QUEUED"|"RUNNING"|"COMPLETED"|"FAILED";
