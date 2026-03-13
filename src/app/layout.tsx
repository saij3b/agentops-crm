import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/Shell";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "AgentOps CRM",
  description: "Unified dashboard for autonomous agents",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionUser = await getSessionUser();

  return (
    <html lang="en">
      <body className="antialiased">
        <Shell sessionUser={sessionUser}>{children}</Shell>
      </body>
    </html>
  );
}
