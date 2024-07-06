"use client"

import { Notice } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Switch } from "@/components/ui/switch"

import { TOGGLE_STATUS } from "@/actions/notice.action"
import { Status } from "@/schema/notice.schema"

interface Props {
    notice: Notice
}  

export const EditButton = ({notice}:Props) => {
    const {mutate: toggleStatus, isPending} = useMutation({
        mutationFn: TOGGLE_STATUS,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "toggle-status"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "toggle-status"
            });
        }
    })

    const handleToggle = () => {
        toast.loading("Status updating...", {
            id: "toggle-status"
        })
        toggleStatus(notice.id)
    }
    return (
        <Switch checked={notice.status === Status.Active} onCheckedChange={handleToggle} disabled={isPending} />
    )
}