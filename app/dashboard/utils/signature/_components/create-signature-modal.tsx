"use client"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Trash } from "lucide-react"
import { SignatureAuthor } from "@prisma/client"
import Image from "next/image"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useSignature } from "@/hooks/use-signature"
import { UploadDropzone } from "@/lib/uploadthing"
import { SignatureSchema } from "../schema"
import { CREATE_SIGNATURE } from "../action"

export const AssignSignatureModal = () => {
    const { open, onClose } = useSignature()

    const form = useForm<z.infer<typeof SignatureSchema>>({
        resolver: zodResolver(SignatureSchema),
        defaultValues: {
            author: undefined,
            imageUrl: "",
        },
    })

    const { mutate: createSignature, isPending } = useMutation({
        mutationFn: CREATE_SIGNATURE,
        onSuccess: (data) => {
            onClose()
            form.reset()
            toast.success(data.success, {
                id: "create-signature"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-signature"
            });
        }
    })

    function onSubmit(values: z.infer<typeof SignatureSchema>) {
        toast.loading("Signature creating...", {
            id: "create-signature"
        })
        createSignature(values)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign New Signature</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select author" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(SignatureAuthor).map((author) => (
                                                <SelectItem key={author} value={author}>
                                                    {author}
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
                                    <FormLabel>Signature Image</FormLabel>
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
                                                <UploadDropzone
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
            </DialogContent>
        </Dialog>

    )
}