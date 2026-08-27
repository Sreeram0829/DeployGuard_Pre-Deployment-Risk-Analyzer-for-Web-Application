import { NextResponse } from "next/server";
import { getScan } from "@/actions/scan.actions";
export async function GET(_:Request,{params}:{params:Promise<{scanId:string}>}){const {scanId}=await params; const scan=await getScan(scanId); if(!scan)return NextResponse.json({error:"Not found"},{status:404}); return NextResponse.json(scan);}
