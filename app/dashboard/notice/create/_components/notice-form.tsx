"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { NoticeStatus } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { NoticeSchema } from "../schema"
import { CREATE_NOTICE } from "../action"

export const NoticeForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof NoticeSchema>>({
        resolver: zodResolver(NoticeSchema),
        defaultValues: {
            notice: "",
            status: undefined
        },
    })

    const { mutate: createNotice, isPending } = useMutation({
        mutationFn: CREATE_NOTICE,
        onSuccess: (data) => {
            router.push("/dashboard/notice")
            toast.success(data.success, {
                id: "create-notice"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-notice"
            });
        }
    })

    function onSubmit(values: z.infer<typeof NoticeSchema>) {
        toast.loading("Notice creating...", {
            id: "create-notice"
        })
        createNotice(values)
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Notice Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="notice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notice</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe notice in brief"
                                            className="resize-none"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(NoticeStatus).map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}