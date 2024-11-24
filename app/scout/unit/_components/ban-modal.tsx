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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useBan } from "@/hooks/use-ban"
import { APPLY_BAN } from "../action"


export const BanModal = () => {
    const [reason, setReason] = useState<string>("")

    const { open, onClose, scoutId } = useBan()

    const { mutate: banScout, isPending } = useMutation({
        mutationFn: APPLY_BAN,
        onSuccess: (data) => {
            onClose()
            setReason("")
            toast.success(data.success, {
                id: "ban-scout"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "ban-scout"
            });
        }
    })

    const handleMigration = () => {
        toast.loading("Applying...", {
            id: "ban-scout"
        })
        banScout({ scoutId, reason })
    }

    return (
        <Dialog open={open && !!scoutId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply Ban</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                    <div>
                        <Label>Reason</Label>
                        <Textarea
                            placeholder="Describe the reason"
                            className="resize-none"
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <span className="text-sm text-muted-foreground">at least 10 characters</span>
                    </div>

                    <Button disabled={isPending || !reason} onClick={handleMigration}>Apply</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}