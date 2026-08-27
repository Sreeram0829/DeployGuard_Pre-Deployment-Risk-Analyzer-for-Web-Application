import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { runZipScan } from "@/actions/scan.actions";
export async function POST(req:Request){const user=await getCurrentUser(); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401}); const form=await req.formData(); const projectId=String(form.get("projectId")||""); const file=form.get("file"); if(!(file instanceof File)) return NextResponse.json({error:"ZIP file is required"},{status:400}); try{const scan=await runZipScan(projectId,file); return NextResponse.json(scan,{status:201});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Scan failed"},{status:400});}}
