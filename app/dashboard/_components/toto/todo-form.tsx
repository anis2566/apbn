"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SendHorizonal } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { TodoSchema } from "../../schema"
import { CREATE_TODO } from "../../action"

export const TodoForm = () => {
    const form = useForm<z.infer<typeof TodoSchema>>({
        resolver: zodResolver(TodoSchema),
        defaultValues: {
            title: "",
        },
    })

    const { mutate: createTodo, isPending } = useMutation({
        mutationFn: CREATE_TODO,
        onSuccess: (data) => {
            form.reset()
            toast.success(data.success, {
                id: "create-todo"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-todo"
            });
        }
    })

    const onSubmit = async (values: z.infer<typeof TodoSchema>) => {
        toast.loading("Todo creating...", {
            id: "create-todo"
        })
        createTodo(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full space-x-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input placeholder="write todo" {...field} className="flex-1" disabled={isPending} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button size="icon" type="submit" disabled={isPending}>
                    <SendHorizonal className="w-4 h-4" />
                </Button>
            </form>
        </Form>
    )
}