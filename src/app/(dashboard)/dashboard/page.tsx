import Link from "next/link";
import { Activity, ArrowRight, FolderKanban, Plus, ShieldAlert, ShieldCheck } from "lucide-react";
import { getDashboardData } from "@/actions/scan.actions";
import { OverviewCard } from "@/components/dashboard/overview-card";
import { ScoreCard } from "@/components/dashboard/score-card";
import { RecentScans } from "@/components/dashboard/recent-scans";

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <div className="space-y-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-slate-500">Overview</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Deployment dashboard</h1><p className="mt-2 text-sm text-slate-500">A quick view of your project health and recent scans.</p></div><Link href="/projects/new" className="inline-flex items-center gap-2 self-start rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"><Plus className="h-4 w-4" />New project</Link></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><OverviewCard label="Projects" value={data.projectCount} icon={FolderKanban} /><OverviewCard label="Completed scans" value={data.completedScans} icon={Activity} /><OverviewCard label="High / critical" value={data.riskyFindings} icon={ShieldAlert} /><OverviewCard label="Latest score" value={data.latestScore === null ? "—" : `${data.latestScore}/100`} icon={ShieldCheck} /></div><div className="grid gap-6 xl:grid-cols-[1fr_320px]"><RecentScans scans={data.recentScans} /><ScoreCard score={data.latestScore} /></div></div>;
}
