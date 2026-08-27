import { notFound } from "next/navigation";
import { getScan } from "@/actions/scan.actions";
import { ReportHeader } from "@/components/reports/report-header";
import { ScoreOverview } from "@/components/reports/score-overview";
import { CategoryScore } from "@/components/reports/category-score";
import { FindingsList } from "@/components/reports/findings-list";
export default async function ScanPage({params}:{params:Promise<{scanId:string}>}){const {scanId}=await params; const scan=await getScan(scanId); if(!scan) notFound(); return <div className="space-y-6"><ReportHeader scan={scan}/><ScoreOverview scan={scan}/><CategoryScore scores={scan.categoryScores as Record<string,number>|null}/><FindingsList findings={scan.findings}/></div>;}
