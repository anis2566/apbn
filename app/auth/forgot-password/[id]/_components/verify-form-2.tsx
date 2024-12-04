"use client"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { PasswordSchema } from "../schema"
import { CHANGE_PASSWORD } from "../action"

interface Props {
    id: string;
}

export const VerifyForm2 = ({ id }: Props) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    })

    const { mutate: changePassword, isPending } = useMutation({
        mutationFn: CHANGE_PASSWORD,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "change-password"
            });
            router.push("/auth/sign-in")
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "change-password"
            });
        }
    })

    function onSubmit(values: z.infer<typeof PasswordSchema>) {
        toast.loading("Password changing...", {
            id: "change-password"
        })
        changePassword({ id, password: values.password })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter passowrd" {...field} type="text" disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter exact passowrd" {...field} type="text" disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>Submit</Button>
            </form>
        </Form>
    )
}