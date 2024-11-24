"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { CalendarIcon, Trash2 } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Training, TrainingType } from "@prisma/client"

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
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { UploadButton } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { TrainingSchema } from "../../../create/schema"
import { UPDATE_TRAINING } from "../action"

interface Props {
    training: Training;
}

export const EditTrainingForm = ({ training }: Props) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof TrainingSchema>>({
        resolver: zodResolver(TrainingSchema),
        defaultValues: {
            title: training.title || "",
            description: training.description || "",
            venue: training.venue || "",
            imageUrl: training.imageUrl || "",
            limit: training.limit || undefined,
            type: training.type as TrainingType || undefined,
            trainingStart: training.trainingStart || undefined,
            trainingEnd: training.trainingEnd || undefined
        },
    })

    const { mutate: updateTraining, isPending } = useMutation({
        mutationFn: UPDATE_TRAINING,
        onSuccess: (data) => {
            router.push("/dashboard/training")
            toast.success(data.success, {
                id: "update-training"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-training"
            });
        }
    })

    function onSubmit(values: z.infer<typeof TrainingSchema>) {
        toast.loading("Training creating...", {
            id: "update-training"
        })
        updateTraining({ values, id: training.id })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid md:grid-cols-3 gap-6 mt-4">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Identify</CardTitle>
                            <CardDescription>Fill up training identiy</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter title" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Desctiption</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter event description"
                                                className="resize-none"
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="venue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Venue</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter venue" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="limit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Limit</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter limit" type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} disabled={isPending} />
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
                            <CardDescription>Fill up training media.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Thumbnail</FormLabel>
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
                                                        <Button type="button" className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} disabled={isPending}>
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
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Type</CardTitle>
                            <CardDescription>Fill up training type.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(TrainingType).map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Date</CardTitle>
                            <CardDescription>Fill up training date.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={form.control}
                                name="trainingStart"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Start</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full flex items-center gap-x-2 pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() || date < new Date("1900-01-01") || isPending
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="trainingEnd"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>End</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full flex items-center gap-x-2 pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < form.getValues("trainingStart") || date < new Date("1900-01-01") || isPending
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Button disabled={isPending}>Update</Button>
                </div>
            </form>
        </Form>
    )
}