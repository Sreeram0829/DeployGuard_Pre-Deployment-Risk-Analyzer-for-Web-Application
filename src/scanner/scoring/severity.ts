import type {Severity} from "@/types/finding";
export const severityWeights:Record<Severity,number>={CRITICAL:25,HIGH:12,MEDIUM:6,LOW:2,INFO:0};
export function calculatePenalty(severity:Severity){return severityWeights[severity];}
