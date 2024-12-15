"use client"

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { SearchTicket } from "../action";
import { toast } from "sonner";

const formSchema = z.object({
    phone: z.string().length(11, {
        message: "invalid phone number",
    }),
})

interface Props {
    children: React.ReactNode;
    eventId: string;
}

export const SearchModal = ({ children, eventId }: Props) => {
    const router = useRouter()

    const {mutate: searchTicket, isPending} = useMutation({
        mutationFn: SearchTicket,
        onSuccess: (data) => {
            if (data.error) {
                toast.error(data.error)
            }

            if (data.appId) {
                toast.success("Application found! Wait a bit!")
                router.push(`/event/${eventId}/ticket/${data.appId}`)
            }
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: ""
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        searchTicket(data.phone)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Search Your Ticket</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="enter your phone number" {...field} className="w-full" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>Search</Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}