"use client"

import { Event } from "@prisma/client"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CREATE_PAYMENT_FOR_EVENT, GENERATE_BKASH_TOKEN } from "@/services/payment.service";
import { EVENT_JOIN } from "../action";

interface EventAppplyFormProps {
    event: Event;
    scoutId: string;
    appId: string;
}

export const EventAppplyForm = ({ event, scoutId, appId }: EventAppplyFormProps) => {

    const router = useRouter()

    // const { mutate: createToken, isPending: isPendingCreateToken } = useMutation({
    //     mutationFn: GENERATE_BKASH_TOKEN,
    //     onSuccess: (data) => {
    //         if (data?.token) {
    //             createPayment({ token: data.token, appId, amount: event.entryFee })
    //         }
    //     },
    //     onError: () => {
    //         toast.error("Something went wrong")
    //     }
    // })

    // const { mutate: createPayment, isPending: isPendingCreatePayment } = useMutation({
    //     mutationFn: CREATE_PAYMENT_FOR_EVENT,
    //     onSuccess: (data) => {
    //         if (data?.url) {
    //             window.location.replace(data?.url)
    //         }
    //     },
    //     onError: (error) => {
    //         console.log(error)
    //     }
    // })

    const { mutate: joinEvent, isPending: isLoading } = useMutation({
        mutationFn: EVENT_JOIN,
        onSuccess: (data) => {
            if (data?.success) {
                toast.success(data?.success, {
                    id: "apply"
                })
                router.push("/scout")
            }
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "apply"
            });
        }
    })

    const handlePay = () => {
        // createToken()
    }

    const handleJoin = () => {
        toast.loading("Applying", {
            id: "apply"
        })
        joinEvent({ id: scoutId, eventId: event.id })
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <Card>
                <CardContent className="pt-4">
                    {
                        event.entryFee > 0 ? (
                            <div className="space-y-2">
                                <p>You need to pay the entry fee to join.</p>
                                <p className="text-xl font-semibold">Amount: <span className="font-bold text-primary">&#2547;{event.entryFee}</span></p>
                                {/* <Button className="w-full" onClick={handlePay} disabled={isPendingCreateToken || isPendingCreatePayment}>Pay Now</Button> */}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p>This event is free. Feel free to join.</p>
                                <Button className="w-full" onClick={handleJoin} disabled={isLoading}>Join Now</Button>
                            </div>
                        )
                    }
                </CardContent>
            </Card>
        </div>
    )
}