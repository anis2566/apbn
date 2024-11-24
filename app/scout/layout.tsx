import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ScoutLayout from "./_components/scout-layout";
import { GET_ADMIN } from "@/services/user.service";
import { AppKnockProviders } from "@/providers/knock-provider";

export default async function DemoLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth()
    const { admin } = await GET_ADMIN()

    if (!session?.status || !session.userId || !admin) {
        redirect("/")
    }
    return (
        <AppKnockProviders userId={session.userId}>
            <ScoutLayout status={session.status} adminId={admin.id}>{children}</ScoutLayout>
        </AppKnockProviders>
    )
}
