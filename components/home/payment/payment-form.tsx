"use client"

import { GET_SCOUT } from "@/actions/scout.action";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuth} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible"

import { GET_FEE_BY_TITLE } from "@/actions/fee.action";
import { APPLY_COUPON } from "@/actions/coupon.action";
import { CONFIRM_PAYMENT, CREATE_PAYMENT_FOR_REGISTER, GENERATE_BKASH_TOKEN } from "@/services/bkash.service";

interface PaymentFormProps {
    scoutId: string;
}

export const PaymentForm = ({ scoutId }: PaymentFormProps) => {
    const [fee, setFee] = useState<number>(500)
    const [coupon, setCoupon] = useState<string>("")
    const [open, setOpen] = useState<boolean>(true)

    const {signOut} = useAuth()

    const {data:regFee} = useQuery({
        queryKey: ["scout-payment-fee"],
        queryFn: async () => {
            const res = await GET_FEE_BY_TITLE("registration")
            return res.fee
        }
    })

    const {data:scout} = useQuery({
        queryKey: ['payment-scout'],
        queryFn: async () => {
            const res = await GET_SCOUT(scoutId)
            return res.scout
        },
        enabled: !!scoutId
    })

    const {mutate: applyCoupon, isPending} = useMutation({
        mutationFn: APPLY_COUPON,
        onSuccess: (data) => {
            setFee(fee - data?.value < 0 ? 0 : fee - data?.value)
            setOpen(false)
            toast.success("Coupon applied", {
                id: "apply-coupon"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "apply-coupon"
            });
        }
    })

    const handleApply = () => {
        toast.loading("Coupon applying...", {
            id: "apply-coupon"
        })
        applyCoupon(coupon)
    }

    useEffect(() => {
        if (scout?.apsId && regFee) {
            setFee(regFee.discountAmount);
        } else {
            setFee(regFee?.amount || 500);
        }
    }, [scout?.apsId, regFee])

    const {mutate: createPayment, isPending:isPendingCreatePayment} = useMutation({
        mutationFn: CREATE_PAYMENT_FOR_REGISTER,
        onSuccess: (data) => {
            if(data?.url) {
                window.location.replace(data?.url)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const {mutate: generateToken, isPending:isPendingGenerate} = useMutation({
        mutationFn: (variables: { scoutId: string, amount: number }) => GENERATE_BKASH_TOKEN(),
        onSuccess: (data) => {
            if (data?.token) {
                createPayment({ scoutId, amount: fee, token: data?.token })
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const {mutate: confirmPayment, isPending: isPeying} = useMutation({
        mutationFn: CONFIRM_PAYMENT,
        onSuccess: (data) => {
            toast.success("Payment successfull")
            signOut({
                redirectUrl: "/scout"
            })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handlePay = () => {
        generateToken({scoutId, amount:fee})
    }

    return (
        <div className="space-y-6">
            <h1 className="text-xl">Your payment amount is <span className="text-2xl font-bold text-primary">&#2547;{fee}</span></h1>
            <Collapsible open={open}>
                <CollapsibleContent>
                    <div className="flex items-center gap-x-2">
                        <Input type="text" placeholder="Appply Coupon Code" className="flex-1" onChange={(e) => setCoupon(e.target.value)} />
                        <Button disabled={!coupon || isPending} onClick={handleApply}>Apply</Button>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            {
                fee === 0 ? (
                    <Button disabled={isPeying} onClick={() => confirmPayment(scoutId)}>Confirm Payment</Button>
                ) : (
                    <Button onClick={handlePay} disabled={isPendingGenerate || isPendingCreatePayment}>Pay with Bkash</Button>
                )
            }
        </div>
    )
}