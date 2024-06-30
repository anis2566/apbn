"use client"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

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
import { CREATE_FEE } from "@/actions/fee.action"
import { useFee } from "@/hooks/use-fee"

export const AssignFeeModal = () => {
    const {open, onClose} = useFee()

    const form = useForm<z.infer<typeof FeeSchema>>({
    resolver: zodResolver(FeeSchema),
    defaultValues: {
        title: "",
        amount: undefined,
        discountAmount: undefined
    },
  })
  
  const {mutate: createFee, isPending} = useMutation({
      mutationFn: CREATE_FEE,
      onSuccess: (data) => {
            onClose()
            form.reset()
            toast.success(data.success, {
                id: "create-fee"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-fee"
            });
        }
  })
 
  function onSubmit(values: z.infer<typeof FeeSchema>) {
    toast.loading("Fee asigning...", {
        id: "create-fee"
    })
    createFee(values)
  }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign New Fee</DialogTitle>
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
                                <FormMessage />
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