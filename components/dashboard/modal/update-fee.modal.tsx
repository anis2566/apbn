"use client"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
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

import { FeeSchema } from "@/schema/fee.schema"
import { UPDATE_FEE } from "@/actions/fee.action"
import { useUpdateFee } from "@/hooks/use-fee"

export const UpdateFeeModal = () => {
    const { open, onClose, fee } = useUpdateFee()
    
    const form = useForm<z.infer<typeof FeeSchema>>({
    resolver: zodResolver(FeeSchema),
    defaultValues: {
        title: fee.title,
        amount: fee.amount,
        discountAmount: fee.discountAmount
    },
  })

    useEffect(() => {
    form.reset({
        title: fee.title,
        amount: fee.amount,
        discountAmount: fee.discountAmount
    });
}, [fee]);
  
    console.log(fee)
    
  const {mutate: updateFee, isPending} = useMutation({
      mutationFn: UPDATE_FEE,
      onSuccess: (data) => {
            onClose()
            form.reset()
            toast.success(data.success, {
                id: "update-fee"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-fee"
            });
        }
  })
 
  function onSubmit(values: z.infer<typeof FeeSchema>) {
    toast.loading("Fee updating...", {
        id: "update-fee"
    })
    updateFee({values: values, feeId: fee?.id || ""})
  }

    return (
        <Dialog open={open && fee.title !== ""} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Fee</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select fee title" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="registration">Registration</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter fee value" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} type="number" disabled={isPending} />
                                </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discountAmount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Discount Amount</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter discount fee value" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} type="number" disabled={isPending} />
                                </FormControl>
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