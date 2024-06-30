"use client"

import { Event } from "@prisma/client"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CREATE_APPLICATION } from "@/actions/event-application.action";
import { CREATE_PAYMENT_FOR_EVENT, GENERATE_BKASH_TOKEN } from "@/services/bkash.service";

interface EventAppplyFormProps {
    event: Event;
    scoutId: string;
}

export const EventAppplyForm = ({event, scoutId}:EventAppplyFormProps) => {
    const [appId, setAppId] = useState<string>("")

    const {mutate: createApplication, isPending} = useMutation({
        mutationFn: CREATE_APPLICATION,
        onSuccess: (data) => {
            if(data?.application) {
                setAppId(data?.application?.id)
                generateToken()
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const {mutate: generateToken} = useMutation({
        mutationFn: GENERATE_BKASH_TOKEN,
        onSuccess: (data) => {
            if (data?.token) {
                createPayment({amount:event.entryFee, token: data?.token, appId, scoutId})
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const {mutate: createPayment} = useMutation({
        mutationFn: CREATE_PAYMENT_FOR_EVENT,
        onSuccess: (data) => {
            if(data?.url) {
                window.location.replace(data?.url)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handlePay = () => {
        createApplication({scoutId, eventId:event.id})
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
                                <Button className="w-full" onClick={handlePay} disabled={isPending}>Pay with Bkash</Button>
                            </div>
                        ) : null
                    }
                </CardContent>
            </Card>
        </div>
    )
}