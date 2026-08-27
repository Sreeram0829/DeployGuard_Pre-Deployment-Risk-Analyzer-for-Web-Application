import Link from "next/link";
import { Plus } from "lucide-react";
import { getProjects } from "@/actions/project.actions";
import { ProjectList } from "@/components/projects/project-list";
export default async function ProjectsPage() { const projects=await getProjects(); return <div className="space-y-6"><div className="flex items-end justify-between"><div><h1 className="text-3xl font-bold tracking-tight">Projects</h1><p className="mt-2 text-sm text-slate-500">Manage projects and inspect their scan history.</p></div><Link href="/projects/new" className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white"><Plus className="h-4 w-4" />New project</Link></div><ProjectList projects={projects} /></div>; }
