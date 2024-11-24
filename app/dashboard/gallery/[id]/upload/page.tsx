"use client"

import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { PlusCircle, Trash2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link";
import Image from "next/image"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { GalleryMediaSchema } from "./schema"
import { cn } from "@/lib/utils"
import { UploadButton } from "@/lib/uploadthing"
import { UPLOAD_IMAGE } from "./action"

interface Props {
    params: {
        id: string;
    }
}

const UploadImagePage = ({ params: { id } }: Props) => {
    const router = useRouter()

    const { mutate: uploadImageHandler, isPending } = useMutation({
        mutationFn: UPLOAD_IMAGE,
        onSuccess: (data) => {
            router.push("/dashboard/gallery")
            toast.success(data?.success, {
                id: "upload-image",
                duration: 2000
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "upload-image",
                duration: 2000
            })
        },
    });


    const form = useForm<z.infer<typeof GalleryMediaSchema>>({
        resolver: zodResolver(GalleryMediaSchema),
        defaultValues: {
            images: [{
                title: "",
                imageUrl: ""
            }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images"
    });

    const onSubmit = (values: z.infer<typeof GalleryMediaSchema>) => {
        toast.loading("Image uploading...", { id: "upload-image" });
        uploadImageHandler({ values, galleryId: id });
    };

    return (
        <ContentLayout title="Gallery">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/gallery">Gallery</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Upload</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        {fields.map((field, index) => (
                            <Card key={field.id}>
                                <CardHeader>
                                    <CardTitle>Image</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`images.${index}.title`}
                                        render={({ field, fieldState }) => (
                                            <FormItem className="space-y-0">
                                                <FormLabel>Title</FormLabel>
                                                <Input {...field} disabled={isPending} />
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`images.${index}.imageUrl`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl>
                                                    {
                                                        form.getValues(`images.${index}.imageUrl`) ? (
                                                            <div className="relative aspect-video mt-2">
                                                                <Image
                                                                    alt="Upload"
                                                                    fill
                                                                    className="object-contain rounded-md mx-auto"
                                                                    src={field.value}
                                                                />
                                                                <Button type="button" className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue(`images.${index}.imageUrl`, "")} disabled={isPending}>
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
                                    <div className={cn("flex justify-end", index === 0 && "hidden")}>
                                        <Button type="button" onClick={() => remove(index)} size="icon" variant="ghost" disabled={isPending}>
                                            <Trash2 className="text-rose-500" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="flex items-center gap-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex items-center gap-x-1"
                            onClick={() => append({
                                title: "",
                                imageUrl: "",
                            })}
                            disabled={isPending}
                        >
                            <PlusCircle className="w-5 h-5" /> Add more
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </ContentLayout>
    )
}

export default UploadImagePage