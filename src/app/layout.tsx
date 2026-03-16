import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/Shell";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "AgentOps CRM",
  description: "Unified dashboard for autonomous agents",
};

const themeBootScript = `(() => {
  try {
    const storageKey = 'agentops-theme';
    const stored = localStorage.getItem(storageKey);
    const theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.classList.toggle('dark', false);
    document.documentElement.style.colorScheme = 'light';
  }
})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionUser = await getSessionUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground transition-colors">
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <Shell sessionUser={sessionUser}>{children}</Shell>
      </body>
    </html>
  );
}
