import { PaymentForm } from "@/components/home/payment/payment-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface PaymentProps {
    params: {
        scoutId: string;
    }
}

const Payment = async ({ params: { scoutId } }: PaymentProps) => {
    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        }
    })

    if (!scout) redirect("/")
    
    
        

    return (
        <div className="flex items-center justify-center min-h-screen mt-6">
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>Pay for complete your registration.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <PaymentForm scoutId={scoutId} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Payment;