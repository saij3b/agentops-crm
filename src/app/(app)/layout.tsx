import Shell from "@/components/Shell";
import { getSessionUser } from "@/lib/auth";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionUser = await getSessionUser();

  return <Shell sessionUser={sessionUser}>{children}</Shell>;
}
