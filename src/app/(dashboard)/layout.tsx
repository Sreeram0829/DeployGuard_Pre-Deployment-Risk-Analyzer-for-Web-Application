import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { requireUser } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return <div className="min-h-screen bg-slate-50"><Navbar /><div className="page-shell flex"><Sidebar /><main className="min-w-0 flex-1 py-8 lg:pl-8">{children}</main></div></div>;
}
