import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeployGuard — Scan Your Web App Before You Ship",
  description: "Pre-deployment risk analysis for web applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
