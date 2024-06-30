"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useAwardCreate } from "@/hooks/use-award"
import { AwardSchema } from "@/schema/award.schema"
import { UploadDropzone } from "@/lib/uploadthing"
import { CREATE_AWARD } from "@/actions/award.action"

export const CreateAwardModal = () => {
    const { open, onClose } = useAwardCreate()

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
            form.reset()
            onClose()
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
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crete Award</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter award title" {...field} disabled={isPending} />
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
                                                    <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} disabled={isPending}>
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
                        <Button type="submit" className="" disabled={isPending}>
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}