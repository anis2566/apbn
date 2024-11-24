"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { CalendarIcon, Trash } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"

import { UploadButton } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { EventSchema } from "../schema"
import { CREATE_EVENT } from "../action"

export const EventForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof EventSchema>>({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            title: "",
            description: "",
            venue: "",
            imageUrl: "",
            entryFee: undefined,
            eventStart: undefined,
            eventEnd: undefined,
            registrationStart: undefined,
            registrationEnd: undefined
        },
    })

    const { mutate: createEvent, isPending } = useMutation({
        mutationFn: CREATE_EVENT,
        onSuccess: (data) => {
            form.reset()
            router.push("/dashboard/event")
            toast.success(data.success, {
                id: "create-event"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-event"
            });
        }
    })

    function onSubmit(values: z.infer<typeof EventSchema>) {
        toast.loading("Event creating...", {
            id: "create-event"
        })
        createEvent(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Identity</CardTitle>
                            <CardDescription>Fill the event information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter event title" {...field} disabled={isPending} />
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
                                        <FormLabel>Description</FormLabel>
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
                                            <Input placeholder="Enter event venue" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="entryFee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Entry Fee</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter event venue" type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} disabled={isPending} />
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
                            <CardDescription>Fill the event images.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Image</FormLabel>
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
                    </Card>
                </div>
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Time</CardTitle>
                            <CardDescription>Define event time.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={form.control}
                                name="eventStart"
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
                                name="eventEnd"
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
                                                        date < form.getValues("eventStart") || date < new Date("1900-01-01") || isPending
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Registration Time</CardTitle>
                            <CardDescription>Define registration time.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <FormField
                                control={form.control}
                                name="registrationStart"
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
                                name="registrationEnd"
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
                                                        date < form.getValues("registrationStart") || date < new Date("1900-01-01") || isPending
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
                    <Button type="submit" disabled={isPending}>Submit</Button>
                </div>
            </form>
        </Form>
    )
}