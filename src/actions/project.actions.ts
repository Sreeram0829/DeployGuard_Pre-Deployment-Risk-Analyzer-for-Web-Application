"use server";
import {prisma} from "@/lib/prisma"; import {requireUser} from "@/lib/auth"; import {projectSchema} from "@/lib/validations";
export async function getProjects(){const user=await requireUser();return prisma.project.findMany({where:{ownerId:user.id},orderBy:{updatedAt:"desc"},include:{_count:{select:{scans:true}}}})}
export async function getProject(id:string){const user=await requireUser();return prisma.project.findFirst({where:{id,ownerId:user.id},include:{_count:{select:{scans:true}}}})}
export async function createProject(input:unknown){const user=await requireUser();const data=projectSchema.parse(input);return prisma.project.create({data:{...data,ownerId:user.id}})}
export async function updateProject(id:string,input:unknown){const user=await requireUser();const data=projectSchema.parse(input);const project=await prisma.project.findFirst({where:{id,ownerId:user.id}});if(!project)throw new Error("Project not found");return prisma.project.update({where:{id},data})}
export async function deleteProject(id:string){const user=await requireUser();const project=await prisma.project.findFirst({where:{id,ownerId:user.id}});if(!project)throw new Error("Project not found");return prisma.project.delete({where:{id}})}
export async function getProjectScans(id:string){const user=await requireUser();return prisma.scan.findMany({where:{project:{id,ownerId:user.id}},orderBy:{createdAt:"desc"}})}
