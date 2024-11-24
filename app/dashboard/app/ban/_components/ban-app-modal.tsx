"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useBanView } from "@/hooks/use-ban"

export const BanViewModal = () => {
    const { open, ban, onClose } = useBanView()

    return (
        <Dialog open={open && ban !== null} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ban Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Scout Name</h4>
                        <p className="text-sm text-muted-foreground">{ban?.scout?.name}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Reason</h4>
                        <p className="text-sm">{ban?.reason}</p>
                    </div>
                    <Button onClick={onClose} className="flex ml-auto">Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}