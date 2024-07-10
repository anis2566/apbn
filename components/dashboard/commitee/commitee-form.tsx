"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

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
import { CREATE_COMMITEE } from "@/actions/commitee.action"

export const CommiteeForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof CommiteeSchema>>({
        resolver: zodResolver(CommiteeSchema),
        defaultValues: {
            name: "",
            designation: "",
            imageUrl: "",
            section: undefined
        },
    })

    const { mutate: createCommitee, isPending } = useMutation({
        mutationFn: CREATE_COMMITEE,
        onSuccess: (data) => {
            form.reset()
            router.push("/dashboard/commitee/list")
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

    function onSubmit(values: z.infer<typeof CommiteeSchema>) {
        toast.loading("Commitee creating...", {
            id: "create-commiteee"
        })
        createCommitee(values)
    }

    // TODO
    // 1. Add start date
    // 2. Add end date

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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="president">সভাপতি</SelectItem>
                                            <SelectItem value="vicePresident">সহ সভাপতি</SelectItem>
                                            <SelectItem value="secretary">সম্পাদক</SelectItem>
                                            <SelectItem value="jointSecretary">যুগ্ম-সম্পাদক</SelectItem>
                                            <SelectItem value="Treasrer">কোষাধ্যক্ষ</SelectItem>
                                            <SelectItem value="groupScoutLeader">গ্রুপ স্কাউট লিডার</SelectItem>
                                            <SelectItem value="advisor">উপদেষ্টা</SelectItem>
                                            <SelectItem value="sponsor">পৃষ্ঠপোষক</SelectItem>
                                            <SelectItem value="unitLeader">ইউনিট লিডার</SelectItem>
                                            <SelectItem value="assistantUnitLeader">সহকারী ইউনিট লিডার</SelectItem>
                                            <SelectItem value="member">সদস্য</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                        <Button type="submit" disabled={isPending}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}