export const SeverityValues=["CRITICAL","HIGH","MEDIUM","LOW","INFO"] as const; export type Severity=typeof SeverityValues[number];
export const CategoryValues=["SECURITY","CONFIGURATION","DEPENDENCIES","BUILD","PERFORMANCE"] as const; export type FindingCategory=typeof CategoryValues[number];
export interface Finding{ruleId:string;severity:Severity;category:FindingCategory;title:string;description:string;file?:string;line?:number;evidence?:string;recommendation:string;}
