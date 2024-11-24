"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import Image from "next/image"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PublishStatus } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { z } from "zod"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { UploadButton } from "@/lib/uploadthing"
import { NewsSchema } from "../schema";
import { CREATE_NEWS } from "../action";

export const NewsForm = () => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

    const router = useRouter()

    const form = useForm<z.infer<typeof NewsSchema>>({
        resolver: zodResolver(NewsSchema),
        defaultValues: {
            title: "",
            news: "",
            imageUrl: "",
            status: undefined
        },
    })

    const { mutate: createNews, isPending } = useMutation({
        mutationFn: CREATE_NEWS,
        onSuccess: (data) => {
            form.reset()
            router.push("/dashboard/news")
            toast.success(data.success, {
                id: "create-news"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-news"
            });
        }
    })

    function onSubmit(values: z.infer<typeof NewsSchema>) {
        toast.loading("News creating...", {
            id: "create-news"
        })
        createNews(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>News</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter news title" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="news"
                            disabled={isPending}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>News</FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            theme="snow"
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Media</CardTitle>
                        <CardContent className="p-0">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>News Image</FormLabel>
                                        <FormControl>
                                            {
                                                form.getValues("imageUrl") ? (
                                                    <div className="relative aspect-video max-h-[200px]">
                                                        <Image
                                                            alt="Upload"
                                                            fill
                                                            className="object-cover rounded-md"
                                                            src={form.getValues("imageUrl")}
                                                        />
                                                        <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} disabled={isPending}>
                                                            <Trash className="text-rose-500" />
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
                        </CardContent>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Status</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                            {Object.values(PublishStatus).map((status) => (
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
                    </CardContent>
                </Card>
                <Button type="submit" variant="ringHover" disabled={isPending}>Submit</Button>
            </form>
        </Form>
    )
}