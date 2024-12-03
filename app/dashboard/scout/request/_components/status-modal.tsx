"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Status } from "@prisma/client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"

import { useScoutStatus } from "@/hooks/use-scout"
import { UPDATE_SCOUT_STATUS } from "../action"
import { Textarea } from "@/components/ui/textarea"


export const ScoutStatusModal = () => {
    const [status, setStatus] = useState<Status>(Status.Pending)
    const [suspendReason, setSuspendReason] = useState<string>("")

    const { open, scoutId, onClose } = useScoutStatus()

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: UPDATE_SCOUT_STATUS,
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
        updateStatus({ id: scoutId, status, suspendReason })
    }

    return (
        <Dialog open={open && !!scoutId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Scout Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <Select onValueChange={(value) => setStatus(value as Status)} disabled={isPending}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.values(Status).map((value, index) => (
                                    <SelectItem value={value} key={index} disabled={value === Status.Pending}>{value}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>

                    <Collapsible open={status === Status.Suspended}>
                        <CollapsibleContent>
                            <Textarea value={suspendReason} onChange={(e) => setSuspendReason(e.target.value)} placeholder="Describe suspension reason" />
                        </CollapsibleContent>
                    </Collapsible>

                    <Button disabled={status === Status.Pending || isPending} onClick={handleUpdate}>Update</Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}