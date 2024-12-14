import { db } from "@/lib/prisma"
import { PaymentStatus } from "@prisma/client"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentForm } from "./_components/payment-form"

interface Props {
    params: {
        id: string
        appId: string
    }
}

const Pay = async ({ params: { id, appId } }: Props) => {
    const application = await db.campApplication.findUnique({
        where: {
            id: appId,
            paymentStatus: PaymentStatus.Unpaid
        }
    })

    if (!application) redirect(`/event/${id}`)

    return (
        <div className="flex items-center justify-center h-full min-h-[40vh] mt-6">
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>Pay for complete your registration.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <PaymentForm app={application} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Pay