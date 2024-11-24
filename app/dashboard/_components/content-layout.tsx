import { auth } from "@/auth";
import { Navbar } from "./navbar";
import { redirect } from "next/navigation";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export async function ContentLayout({ title, children }: ContentLayoutProps) {
  const session = await auth();

  if (!session) return redirect("/auth/sign-in");

  return (
    <div>
      <Navbar title={title} role={session.role} />
      <div className="container p-4">{children}</div>
    </div>
  );
}