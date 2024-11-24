"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import Image from "next/image"
import { Trash } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { UploadDropzone } from "@/lib/uploadthing"
import { TrainingApplicationSchema } from "../schema"
import { APPLY_TRAINING } from "../action"

interface Props {
    trainingId: string;
}

export const ApplyForm = ({ trainingId }: Props) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof TrainingApplicationSchema>>({
        resolver: zodResolver(TrainingApplicationSchema),
        defaultValues: {
            attachments: [],
            trainingId
        },
    })

    const { mutate: createTrainingApp, isPending } = useMutation({
        mutationFn: APPLY_TRAINING,
        onSuccess: (data) => {
            router.push("/scout/training/app")
            toast.success(data?.success, {
                id: "apply-training"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "apply-training"
            });
        }
    })

    function onSubmit(values: z.infer<typeof TrainingApplicationSchema>) {
        toast.loading("Applying...", {
            id: "apply-training"
        })
        createTrainingApp(values)
    }

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Apply</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-8">
                            <FormField
                                control={form.control}
                                name="attachments"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Attachments</FormLabel>
                                        <FormControl>
                                            {
                                                form.getValues("attachments").length > 0 ? (
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        {
                                                            form.getValues("attachments").map((item, index) => (
                                                                <div className="relative aspect-video" key={index}>
                                                                    <Image
                                                                        alt="Upload"
                                                                        fill
                                                                        className="object-cover rounded-md"
                                                                        src={item}
                                                                    />
                                                                    <Button type="button" className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("attachments", form.getValues("attachments").filter((_, i) => i !== index))} disabled={isPending}>
                                                                        <Trash className="text-rose-500" />
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ) : (
                                                    <UploadDropzone
                                                        endpoint="multipleImageUploader"
                                                        onClientUploadComplete={(res) => {
                                                            field.onChange(res.map(file => file.url))
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
                        </CardContent>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}