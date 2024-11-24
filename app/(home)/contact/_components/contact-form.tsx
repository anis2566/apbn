"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { MessageSchema } from "../schema"
import { CREATE_MESSAGE } from "../action"

export const ContactForm = () => {
    const form = useForm<z.infer<typeof MessageSchema>>({
        resolver: zodResolver(MessageSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    const { mutate: createMessage, isPending } = useMutation({
        mutationFn: CREATE_MESSAGE,
        onSuccess: (data) => {
            form.reset()
            toast.success(data.success, {
                id: "create-message"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-message"
            });
        }
    })

    function onSubmit(values: z.infer<typeof MessageSchema>) {
        toast.loading("Message submitting...", {
            id: "create-message"
        })
        createMessage(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4 md:py-16">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us your thought"
                                    className="resize-none"
                                    {...field} disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending}>Submit</Button>
                </div>
            </form>
        </Form>
    )
}