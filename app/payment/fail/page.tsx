import { Metadata } from "next"
import { Suspense } from "react"

import { PaymentFailed } from "./_components/payment-fail-page"

export const metadata: Metadata = {
    title: "APBn Scouts | Payment Failed",
    description: "Apbn scouts group",
}


const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentFailed />
        </Suspense>
    )
}

export default Page
