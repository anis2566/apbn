"use client"

import { Check, Trash } from "lucide-react"
import { Todo } from "@prisma/client"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"
import { DELETE_TODO, TOGGLE_TODO } from "../../action"

interface TodoListProps {
    todos: Todo[]
}


export const TodoList = ({ todos }: TodoListProps) => {

    const { mutate: toggleTodo } = useMutation({
        mutationFn: TOGGLE_TODO,
        onSuccess: (data) => {
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

    const { mutate: deleteTodo } = useMutation({
        mutationFn: DELETE_TODO,
        onSuccess: (data) => {
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

    const handleToggoleTodo = async (id: string) => {
        toggleTodo(id)
    }

    const handleDeleteTodo = async (id: string) => {
        deleteTodo(id)
    }

    return (
        <div className="space-y-2">
            {
                todos.map(todo => (
                    <div className="flex items-center justify-between gap-x-2" key={todo.id}>
                        <p className="text-sm text-accent-foreground">{todo.title}</p>
                        <div className="flex items-center gap-x-1 flex-shrink-0">
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className={cn("rounded-sm p-[3px] hover:bg-accent hover:text-accent-foreground cursor-pointer", todo.isCompleted && "bg-green-500 text-white hover:bg-green-500")} onClick={() => handleToggoleTodo(todo.id)}>
                                            <Check className="w-5 h-5" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="rounded-sm p-[3px] hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={() => handleDeleteTodo(todo.id)}>
                                            <Trash className="w-5 h-5 text-rose-500" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete todo</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}