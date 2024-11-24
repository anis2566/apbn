"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useMigrationView } from "@/hooks/use-migration"

export const MigrationViewModal = () => {
    const { open, migration, onClose } = useMigrationView()

    return (
        <Dialog open={open && migration !== null} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Migration Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Scout Name</h4>
                        <p className="text-sm text-muted-foreground">{migration?.scout?.name}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Migrate Unit</h4>
                        <p className="text-sm">{migration?.unit?.name}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Reason</h4>
                        <p className="text-sm">{migration?.reason}</p>
                    </div>
                    <Button onClick={onClose} className="flex ml-auto">Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}