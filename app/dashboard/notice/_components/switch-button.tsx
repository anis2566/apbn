"use client"

import { Notice, NoticeStatus } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Switch } from "@/components/ui/switch"

import { TOGGLE_STATUS } from "../action"

interface Props {
    notice: Notice
}

export const SwitchButton = ({ notice }: Props) => {
    const { mutate: toggleStatus, isPending } = useMutation({
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
        <Switch checked={notice.status === NoticeStatus.Active} onCheckedChange={handleToggle} disabled={isPending} />
    )
}