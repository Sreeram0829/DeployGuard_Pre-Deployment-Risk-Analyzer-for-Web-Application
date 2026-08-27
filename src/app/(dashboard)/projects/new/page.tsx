import Link from "next/link";
import { ProjectForm } from "@/components/projects/project-form";
export default function NewProjectPage(){ return <div className="mx-auto max-w-2xl space-y-6"><div><Link href="/projects" className="text-sm text-slate-500 hover:text-slate-900">← Projects</Link><h1 className="mt-3 text-3xl font-bold">Create project</h1><p className="mt-2 text-sm text-slate-500">Give your project a name, then upload a ZIP from its project page.</p></div><ProjectForm /></div>; }
