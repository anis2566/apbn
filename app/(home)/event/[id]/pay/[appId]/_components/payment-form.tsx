"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible"

// import { APPLY_COUPON, CONFIRM_PAYMENT, GET_FEE_BY_TITLE, GET_SCOUT } from "../action";
import { CREATE_PAYMENT_FOR_EVENT, GENERATE_BKASH_TOKEN } from "@/services/payment.service";
import { CampApplication } from "@prisma/client";

interface PaymentFormProps {
    app: CampApplication
}

export const PaymentForm = ({ app }: PaymentFormProps) => {
    const router = useRouter()


    const { mutate: createToken, isPending: isPendingCreateToken } = useMutation({
        mutationFn: GENERATE_BKASH_TOKEN,
        onSuccess: (data) => {
            if (data?.token) {
                createPayment({ token: data.token, appId: app.id, amount: app.amount })
            }
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })

    const { mutate: createPayment, isPending: isPendingCreatePayment } = useMutation({
        mutationFn: CREATE_PAYMENT_FOR_EVENT,
        onSuccess: (data) => {
            if (data?.url) {
                window.location.replace(data?.url)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handlePay = () => {
        createToken()
    }

    return (
        <div className="space-y-6">
            <h1 className="text-xl">Your payment amount is <span className="text-2xl font-bold text-primary">&#2547;{app.amount}</span></h1>
            {/* <Collapsible open={open}>
                <CollapsibleContent>
                    <div className="flex items-center gap-x-2">
                        <Input type="text" placeholder="Appply Coupon Code" className="flex-1" onChange={(e) => setCoupon(e.target.value)} />
                        <Button disabled={!coupon || isPending} onClick={handleApply}>Apply</Button>
                    </div>
                </CollapsibleContent>
            </Collapsible> */}

            <Button className="w-full" onClick={handlePay} disabled={isPendingCreateToken || isPendingCreatePayment}>Pay With Bkash</Button>
        </div>
    )
}
