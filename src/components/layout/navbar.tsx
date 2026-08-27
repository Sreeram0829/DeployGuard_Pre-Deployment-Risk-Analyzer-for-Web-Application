import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SignOutButton } from "./sign-out-button";
export function Navbar(){return <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur"><div className="page-shell flex h-16 items-center justify-between"><Link href="/dashboard" className="flex items-center gap-2 font-bold"><ShieldCheck className="h-5 w-5"/>DeployGuard</Link><SignOutButton/></div></header>}
