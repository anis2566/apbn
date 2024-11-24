import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentForm } from "./_components/payment-form";

interface Props {
    params: {
        id: string;
    }
}

const Payment = ({ params: { id } }: Props) => {
    return (
        <div className="flex items-center justify-center min-h-screen mt-6">
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>Pay for complete your registration.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <PaymentForm scoutId={id} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Payment
