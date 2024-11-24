"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { useScoutCard } from "@/hooks/use-scout"
import { UPDATE_SCOUT_CARD_STATUS } from "../action"

export const ScoutCardModal = () => {
    const [status, setStatus] = useState<string>("")

    const { open, scoutId, onClose } = useScoutCard()

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: UPDATE_SCOUT_CARD_STATUS,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "update-status"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-status"
            });
        }
    })

    const handleUpdate = () => {
        toast.loading("Status updating...", {
            id: "update-status"
        })
        updateStatus({ scoutId, status: status === "approve" ? true : false })
    }

    return (
        <Dialog open={open && !!scoutId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Card Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <Select onValueChange={(value) => setStatus(value)} disabled={isPending}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="approve" >Approve</SelectItem>
                            <SelectItem value="reject" >Reject</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button disabled={isPending} onClick={handleUpdate}>Update</Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}