import LoginPanel from "@/components/LoginPanel";

interface LoginPageProps {
  searchParams?: Promise<{
    next?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const nextPath = params.next || "/";

  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center justify-center">
      <LoginPanel nextPath={nextPath} />
    </div>
  );
}
