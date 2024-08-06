"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { MigrationStatus } from "@/schema/migration.schema"
import { useTrainingAppStatus } from "@/hooks/use-training-app"
import { UPDATE_STATUS } from "@/actions/training.action"


export const TrainingAppStatusModal = () => {
    const [status, setStatus] = useState<MigrationStatus>(MigrationStatus.Pending)

    const { open, onClose, id } = useTrainingAppStatus()

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: UPDATE_STATUS,
        onSuccess: (data) => {
            onClose()
            toast.success(data.success, {
                id: "update-status"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-status"
            });
        }
    })

    const handleStatusUpdate = () => {
        toast.loading("Status updating...", {
            id: "update-status"
        })
        updateStatus({ id: id, status })
    }

    return (
        <Dialog open={open && !!id} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Application Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                    <Select onValueChange={(value) => setStatus(value as MigrationStatus)} disabled={isPending}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.values(MigrationStatus).map((v, i) => (
                                    <SelectItem key={i} value={v} disabled={v === MigrationStatus.Pending}>{v}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Button disabled={status === MigrationStatus.Pending || isPending} onClick={handleStatusUpdate}>Update</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}