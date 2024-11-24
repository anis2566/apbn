import { Suspense } from "react"
import { Metadata } from "next"

import { Loader } from "@/components/loader"
import { SuccessCard } from "./_components/success-card"

export const metadata: Metadata = {
  title: "APBn Scouts | Payment Failed",
  description: "Apbn scouts group",
}

const PaymentSuccess = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SuccessCard />
    </Suspense>
  )
}

export default PaymentSuccess