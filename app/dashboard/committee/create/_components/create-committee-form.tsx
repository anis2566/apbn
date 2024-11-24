"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { CommiteeSection } from "@prisma/client"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react"

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { formatString } from "@/lib/utils"
import { CommitteeSchema } from "../schema"
import { CREATE_COMMITTEE } from "../action"

export const CommiteeForm = () => {
    const [start, setStart] = useState<Date>(new Date())
    const [end, setEnd] = useState<Date>(new Date())


    const router = useRouter()

    const form = useForm<z.infer<typeof CommitteeSchema>>({
        resolver: zodResolver(CommitteeSchema),
        defaultValues: {
            title: "",
            section: undefined,
            start: undefined,
            end: undefined
        },
    })

    const { mutate: createCommitee, isPending } = useMutation({
        mutationFn: CREATE_COMMITTEE,
        onSuccess: (data) => {
            form.reset()
            router.push("/dashboard/committee")
            toast.success(data.success, {
                id: "create-commiteee"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-commiteee"
            });
        }
    })

    function onSubmit(values: z.infer<typeof CommitteeSchema>) {
        toast.loading("Commitee creating...", {
            id: "create-commiteee"
        })
        createCommitee(values)
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Commitee Form</CardTitle>
                <CardDescription>Fill up commitee information.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter committee title..." {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="section"
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
                                            {Object.values(CommiteeSection).map((section) => (
                                                <SelectItem key={section} value={section}>
                                                    {formatString(section)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="start"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start</FormLabel>
                                    <div>
                                        <DatePicker
                                            selected={start}
                                            onChange={(date: Date | null) => {
                                                if (date) {
                                                    setStart(date)
                                                    field.onChange(date)
                                                }
                                            }}
                                            showYearDropdown
                                            dateFormatCalendar="MMMM"
                                            yearDropdownItemNumber={30}
                                            scrollableYearDropdown
                                            isClearable
                                            className="border border-input w-full p-2 rounded-md"
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End</FormLabel>
                                    <div>
                                        <DatePicker
                                            selected={end}
                                            onChange={(date: Date | null) => {
                                                if (date) {
                                                    setEnd(date)
                                                    field.onChange(date)
                                                }
                                            }}
                                            showYearDropdown
                                            dateFormatCalendar="MMMM"
                                            yearDropdownItemNumber={30}
                                            scrollableYearDropdown
                                            isClearable
                                            className="border border-input w-full p-2 rounded-md"
                                        />
                                    </div>
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