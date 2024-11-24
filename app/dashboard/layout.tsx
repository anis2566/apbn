import { redirect } from "next/navigation";

import { AppKnockProviders } from "@/providers/knock-provider";
import AdminPanelLayout from "./_components/admin-layout";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth()

  if (!session?.status || !session.userId) {
    redirect("/")
  }

  return (
    <AppKnockProviders userId={session.userId}>
      <AdminPanelLayout role={session.role}>{children}</AdminPanelLayout>
    </AppKnockProviders>
  )
}