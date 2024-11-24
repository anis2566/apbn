"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Gallery } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { GallerySchema } from "../../../create/schema"
import { UPDATE_GALLERY } from "../action"
import { UploadButton } from "@/lib/uploadthing"

interface Props {
    gallery: Gallery
}

export const EditGalleryForm = ({ gallery }: Props) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof GallerySchema>>({
        resolver: zodResolver(GallerySchema),
        defaultValues: {
            title: gallery.title || "",
            imageUrl: gallery.imageUrl || ""
        },
    })

    const { mutate: updateGallery, isPending } = useMutation({
        mutationFn: UPDATE_GALLERY,
        onSuccess: (data) => {
            router.push("/dashboard/gallery")
            toast.success(data.success, {
                id: "update-gallery"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-gallery"
            });
        }
    })

    function onSubmit(values: z.infer<typeof GallerySchema>) {
        toast.loading("Gallery updating...", {
            id: "update-gallery"
        })
        updateGallery({ values, id: gallery.id })
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Update Form</CardTitle>
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
                                        <Input placeholder="Enter gallery title" {...field} disabled={isPending} />
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
                                                    <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} disabled={isPending} type="button">
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

                        <Button type="submit" disabled={isPending}>Update</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}