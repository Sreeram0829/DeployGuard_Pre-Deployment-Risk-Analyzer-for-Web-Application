import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck, Gauge } from "lucide-react";

const checks = ["Exposed secrets", "Unsafe environment handling", "Localhost URLs", "CORS configuration", "Build readiness", "Dependencies & lockfiles"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="page-shell flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight"><ShieldCheck className="h-5 w-5" />DeployGuard</Link>
          <div className="flex items-center gap-3"><Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-950">Log in</Link><Link href="/register" className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">Get started</Link></div>
        </div>
      </header>
      <section className="border-b bg-slate-50">
        <div className="page-shell grid min-h-[560px] items-center gap-12 py-20 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-600"><FileSearch className="h-3.5 w-3.5" />Pre-deployment static analysis</div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">Scan Your Web App Before You Ship.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">DeployGuard inspects source code and project configuration for practical deployment risks before they become production problems.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/register" className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Start a scan <ArrowRight className="h-4 w-4" /></Link><a href="#how-it-works" className="rounded-md border bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">How it works</a></div>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4"><div><p className="text-xs font-medium uppercase tracking-wider text-slate-500">Deployment readiness</p><p className="mt-1 text-4xl font-bold">84<span className="text-xl text-slate-400">/100</span></p></div><Gauge className="h-10 w-10 text-slate-700" /></div>
            <div className="mt-5 space-y-3">{checks.map((check, i) => <div key={check} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5"><span className="text-sm text-slate-700">{check}</span><CheckCircle2 className={"h-4 w-4 " + (i < 2 ? "text-amber-500" : "text-emerald-600")} /></div>)}</div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="page-shell py-20"><div className="max-w-2xl"><p className="text-sm font-semibold text-slate-500">Built for developers</p><h2 className="mt-2 text-3xl font-bold tracking-tight">One coherent scan from ZIP to report.</h2><p className="mt-4 text-slate-600">Upload your project, let the independent scanner run its typed rules, then review a centralized score and actionable findings.</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{[["01","Upload","Add a project and upload its ZIP archive."],["02","Analyze","DeployGuard safely inspects files without executing your application."],["03","Fix","Review severity-ranked findings and recommended fixes."]].map(([n,t,d])=><div key={n} className="rounded-xl border bg-white p-6"><span className="text-xs font-semibold text-slate-400">{n}</span><h3 className="mt-5 font-semibold">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{d}</p></div>)}</div></section>
    </main>
  );
}
