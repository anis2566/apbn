import { db } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { Ticket } from "./_components/ticket";

interface Props {
    params: {
        id: string;
        appId: string;
    }
}

const TicketPage = async ({ params: { appId } }: Props) => {
    const application = await db.campApplication.findUnique({
        where: {
            id: appId,
            paymentStatus: PaymentStatus.Paid
        },
        include: {
            members: true
        }
    })

    if (!application) redirect("/")

    return (
        <div className="w-full max-w-screen-xl mx-auto py-10">
            <Ticket app={application} />
        </div>
    )
}

export default TicketPage
