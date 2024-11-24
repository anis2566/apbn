"use client"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Trash } from "lucide-react"
import { Designation } from "@prisma/client"
import Image from "next/image"
import { useEffect } from "react"

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
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { CommitteeMember } from "../schema"
import { useCommitteeMemberUpdate } from "@/hooks/use-committee-member"
import { UploadButton } from "@/lib/uploadthing"
import { UPDATE_MEMBER } from "../action"

export const UpdateMemberModal = () => {
    const { open, onClose, member, memberId } = useCommitteeMemberUpdate()

    const form = useForm<z.infer<typeof CommitteeMember>>({
        resolver: zodResolver(CommitteeMember),
        defaultValues: {
            name: member?.name || "",
            imageUrl: member?.imageUrl || "",
            designation: member?.designation || undefined,
        },
    })

    useEffect(() => {
        form.reset({
            name: member?.name,
            imageUrl: member?.imageUrl,
            designation: member?.designation
        });
    }, [member, form]);

    const { mutate: updateMember, isPending } = useMutation({
        mutationFn: UPDATE_MEMBER,
        onSuccess: (data) => {
            onClose()
            form.reset()
            toast.success(data.success, {
                id: "update-member"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-member"
            });
        }
    })

    function onSubmit(values: z.infer<typeof CommitteeMember>) {
        toast.loading("Member updating...", {
            id: "update-member"
        })
        updateMember({ values, id: memberId })
    }

    return (
        <Dialog open={open && !!memberId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign New Member</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter coupon title" {...field} type="text" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(Designation).map((designation) => (
                                                <SelectItem key={designation} value={designation}>
                                                    {designation}
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
                        <Button type="submit" disabled={isPending}>Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}