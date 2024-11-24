"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Award } from "@prisma/client"
import { toast } from "sonner"
import Image from "next/image"
import { Trash2 } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { AwardSchema } from "../../../create/schema"
import { UploadButton } from "@/lib/uploadthing"
import { UPDATE_AWARD } from "../action"

interface Props {
    award: Award
}

export const EditAwardForm = ({ award }: Props) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof AwardSchema>>({
        resolver: zodResolver(AwardSchema),
        defaultValues: {
            title: award.title || "",
            imageUrl: award.imageUrl || ""
        },
    })

    const { mutate: updateAward, isPending } = useMutation({
        mutationFn: UPDATE_AWARD,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-award"
            });
            router.push("/dashboard/award")
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-award"
            });
        }
    })

    function onSubmit(values: z.infer<typeof AwardSchema>) {
        toast.loading("Award updating...", {
            id: "update-award"
        })
        updateAward({ values: values, awardId: award.id })
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Edit Award</CardTitle>
                <CardDescription>Customize award information.</CardDescription>
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

                        <Button type="submit" disabled={isPending}>Update</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}