import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createProject } from "@/actions/project.actions";
import { projectSchema } from "@/lib/validations";
export async function POST(req:Request){const user=await getCurrentUser(); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401}); try{const body=projectSchema.parse(await req.json()); const project=await createProject(body); return NextResponse.json(project,{status:201});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Invalid request"},{status:400});}}
