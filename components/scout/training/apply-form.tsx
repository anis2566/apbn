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
import { CREATE_APPLICATION } from "@/actions/training-application.action"
import { TrainingApplicationSchema } from "@/schema/training-application.schema"

interface Props {
    trainingId: string;
}

export const ApplyForm = ({trainingId}:Props) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof TrainingApplicationSchema>>({
        resolver: zodResolver(TrainingApplicationSchema),
        defaultValues: {
            attachments: [],
            trainingId
        },
    })

    const {mutate: createTrainingApp, isPending} = useMutation({
        mutationFn: CREATE_APPLICATION,
        onSuccess: (data) => {
            router.push("/scout/training")
            toast.success(data?.success, {
                id: "create-app"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-app"
            });
        }
    })

    function onSubmit(values: z.infer<typeof TrainingApplicationSchema>) {
        toast.loading("Applying...", {
            id: "create-app"
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
                                                                    <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("attachments", form.getValues("attachments").filter((_, i) => i !== index))} type="button" disabled={isPending}>
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