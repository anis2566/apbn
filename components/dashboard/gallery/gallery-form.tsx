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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { GallerySchema } from "@/schema/gallery.schema"
import { UploadDropzone } from "@/lib/uploadthing"
import { CREATE_GALLERY } from "@/actions/gallery.action"

export const GalleryForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof GallerySchema>>({
        resolver: zodResolver(GallerySchema),
        defaultValues: {
            images: [],
        },
    })

    const {mutate: createGallery, isPending} = useMutation({
        mutationFn: CREATE_GALLERY,
        onSuccess: (data) => {
            router.push("/dashboard/gallery")
            toast.success(data.success, {
                id: "create-gallery"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-gallery"
            });
        }
    })

    function onSubmit(values: z.infer<typeof GallerySchema>) {
        toast.loading("Image uploading...", {
            id: "create-gallery"
        })
        createGallery(values)
    }

    function handleDeleteImage(index: number) {
        const currentImages = form.getValues("images")
        const updatedImages = currentImages.filter((_, i) => i !== index)
        form.setValue("images", updatedImages)
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Upload Photo</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        {
                                            form.getValues("images").length > 0 ? (
                                                <div className="grid md:grid-cols-3 gap-6">
                                                    {
                                                        form.getValues("images").map((image, i) => (
                                                            <div className="relative aspect-video" key={i}>
                                                                <Image
                                                                    alt="Upload"
                                                                    fill
                                                                    className="object-cover rounded-md"
                                                                    src={image}
                                                                />
                                                                <Button
                                                                    className="absolute top-0 right-0"
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleDeleteImage(i)}
                                                                    disabled={isPending}
                                                                >
                                                                    <Trash2 className="text-rose-500" />
                                                                </Button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ) : (
                                                <UploadDropzone
                                                    endpoint="multipleImageUploader"
                                                    onClientUploadComplete={(res: { url: string, key: string}[]) => {
                                                        field.onChange(res.map(item => item.url))
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