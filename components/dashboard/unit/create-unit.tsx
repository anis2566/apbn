"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { Section, UnitSchema } from "@/schema/unit.schema"
import { CREATE_UNIT } from "@/actions/unit.action"

export const CreateUnitForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof UnitSchema>>({
        resolver: zodResolver(UnitSchema),
        defaultValues: {
            name: "",
            limit: undefined,
            section: Section.Cub,
        },
    })

    const {mutate: createUnit, isPending} = useMutation({
        mutationFn: CREATE_UNIT,
        onSuccess: (data) => {
            form.reset()
            router.push("/dashboard/unit")
            toast.success(data.success, {
                id: "create-unit"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-unit"
            });
        }
    })

    function onSubmit(values: z.infer<typeof UnitSchema>) {
        toast.loading("Unit creating...", {
            id: "create-unit"
        })
        createUnit(values)
    }


    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Unit Form</CardTitle>
                <CardDescription>Create unit with necessary info.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter unit name" type="text" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="limit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Limit</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter member limit" type="number" {...field} disabled={isPending} onChange={(e) => field.onChange(parseInt(e.target.value))} />
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
                                <FormLabel>Section</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(Section).map((section) => (
                                            <SelectItem key={section} value={section}>
                                                {section}
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
