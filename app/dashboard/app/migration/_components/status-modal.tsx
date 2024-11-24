"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { AppStatus } from "@prisma/client"

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

import { useMigrationStatus } from "@/hooks/use-migration"
import { UPDATE_MIGRATION_STATUS } from "../action"


export const MigrationStatusModal = () => {
    const [status, setStatus] = useState<AppStatus>(AppStatus.Pending)

    const { open, onClose, migrationId } = useMigrationStatus()

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: UPDATE_MIGRATION_STATUS,
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
        updateStatus({ migrationId, status })
    }

    return (
        <Dialog open={open && !!migrationId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Migration Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                    <Select onValueChange={(value) => setStatus(value as AppStatus)} disabled={isPending}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.values(AppStatus).map((v, i) => (
                                    <SelectItem key={i} value={v} disabled={v === AppStatus.Pending}>{v}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Button disabled={status === AppStatus.Pending || isPending} onClick={handleStatusUpdate}>Update</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}