import Link from "next/link";
import { ShieldCheck } from "lucide-react";
export default function AuthLayout({ children }: { children: React.ReactNode }) { return <main className="min-h-screen bg-slate-50"><div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12"><Link href="/" className="mx-auto mb-8 flex items-center gap-2 font-bold"><ShieldCheck className="h-5 w-5" />DeployGuard</Link>{children}</div></main>; }
