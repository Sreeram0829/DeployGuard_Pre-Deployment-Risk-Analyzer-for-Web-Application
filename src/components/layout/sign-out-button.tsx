"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
export function SignOutButton(){return <button type="button" onClick={()=>signOut({callbackUrl:"/"})} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"><LogOut className="h-4 w-4"/>Sign out</button>}
