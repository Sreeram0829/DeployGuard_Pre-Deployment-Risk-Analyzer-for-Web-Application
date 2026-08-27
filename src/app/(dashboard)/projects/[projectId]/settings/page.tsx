import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/actions/project.actions";
import { ProjectForm } from "@/components/projects/project-form";
export default async function ProjectSettingsPage({params}:{params:Promise<{projectId:string}>}){const {projectId}=await params; const project=await getProject(projectId); if(!project) notFound(); return <div className="mx-auto max-w-2xl space-y-6"><Link href={`/projects/${project.id}`} className="text-sm text-slate-500">← Project</Link><div><h1 className="mt-3 text-3xl font-bold">Project settings</h1><p className="mt-2 text-sm text-slate-500">Update project metadata.</p></div><ProjectForm project={project}/></div>;}
