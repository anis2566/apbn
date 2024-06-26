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

import { useMigrationStatus } from "@/hooks/use-migration"
import { MigrationStatus } from "@/schema/migration.schema"
import { UPDATE_MIGRATION_STATUS } from "@/actions/migration.action"


export const MigrationStatusModal = () => {
    const [status, setStatus] = useState<MigrationStatus>(MigrationStatus.Pending)

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