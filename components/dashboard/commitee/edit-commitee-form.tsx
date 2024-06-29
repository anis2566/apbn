"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Commitee } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"

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
import { UploadButton } from "@/lib/uploadthing"
import { CommiteeSchema, CommiteeSection } from "@/schema/commitee.schema"
import { UPDATE_COMMITEE } from "@/actions/commitee.action"

interface Props {
    commitee: Commitee;
}

export const EditCommiteeForm = ({commitee}:Props) => {

    const form = useForm<z.infer<typeof CommiteeSchema>>({
        resolver: zodResolver(CommiteeSchema),
        defaultValues: {
            name: commitee.name || "",
            designation: commitee.designation || "",
            imageUrl: commitee.imageUrl || "",
            section: commitee.section as CommiteeSection || undefined
        },
    })

    const { mutate: createCommitee, isPending } = useMutation({
        mutationFn: UPDATE_COMMITEE,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-commitee"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-commitee"
            });
        }
    })

    function onSubmit(values: z.infer<typeof CommiteeSchema>) {
        toast.loading("Commitee updating...", {
            id: "update-commitee"
        })
        createCommitee({values, id: commitee.id})
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Edit Commitee Form</CardTitle>
                <CardDescription>Customize up commitee information.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter designation" {...field} disabled={isPending} />
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
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
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
                                                    <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} disabled={isPending}>
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