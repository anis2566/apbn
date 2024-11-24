"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Trash2 } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { AwardSchema } from "../schema"
import { UploadButton } from "@/lib/uploadthing"
import { CREATE_AWARD } from "../action"

export const AwardForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof AwardSchema>>({
        resolver: zodResolver(AwardSchema),
        defaultValues: {
            title: "",
            imageUrl: ""
        },
    })

    const { mutate: createAward, isPending } = useMutation({
        mutationFn: CREATE_AWARD,
        onSuccess: (data) => {
            router.push("/dashboard/award")
            toast.success(data.success, {
                id: "create-award"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-award"
            });
        }
    })

    function onSubmit(values: z.infer<typeof AwardSchema>) {
        toast.loading("Award creating...", {
            id: "create-award"
        })
        createAward(values)
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Award Form</CardTitle>
                <CardDescription>Create award with necessary info.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter award title..." type="text" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Award Image</FormLabel>
                                    <FormControl>
                                        {
                                            form.getValues("imageUrl") ? (
                                                <div className="relative mt-2">
                                                    <Image
                                                        alt="Upload"
                                                        width={120}
                                                        height={120}
                                                        className="object-contain rounded-md mx-auto"
                                                        src={form.getValues("imageUrl")}
                                                    />
                                                    <Button type="button" className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} disabled={isPending}>
                                                        <Trash2 className="text-rose-500" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => {
                                                        field.onChange(res[0].url)
                                                        toast.success("Image uploaded")
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error("Image upload failed")
                                                    }}
                                                />
                                            )
                                        }
                                    </FormControl>
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