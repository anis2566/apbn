"use client"

import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Section } from "@/schema/scout.schema"
import { useMigrationLeader } from "@/hooks/use-migration"
import { GET_UNITS_BY_SECTION } from "@/actions/unit.action"
import { APPLY_MIGRATION } from "@/actions/migration.action"


export const MigrationModalLeader = () => {
    const [section, setSection] = useState<Section>()
    const [unit, setUnit] = useState<string>("")
    const [reason, setReason] = useState<string>("")

    const { open, onClose, scoutId } = useMigrationLeader()

    const { data: units } = useQuery({
        queryKey: ["get-units-by-section", section],
        queryFn: async () => {
            const res = await GET_UNITS_BY_SECTION(section as Section)
            return res.units
        },
        enabled: open
    })

    const { mutate: migrateScout, isPending } = useMutation({
        mutationFn: APPLY_MIGRATION,
        onSuccess: (data) => {
            onClose()
            setUnit("")
            setReason("")
            toast.success(data.success, {
                id: "migrate-scout"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "migrate-scout"
            });
        }
    })

    const handleMigration = () => {
        toast.loading("Applying...", {
            id: "migrate-scout"
        })
        migrateScout({ scoutId, unitId: unit, reason })
    }

    return (
        <Dialog open={open && !!scoutId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply Migration</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                    <div>
                        <Label>Section</Label>
                        <Select onValueChange={(value) => setSection(value as Section)} disabled={isPending}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Section" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.values(Section).map((v, i) => (
                                        <SelectItem key={i} value={v}>{v}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Unit</Label>
                        <Select onValueChange={(value) => setUnit(value)} disabled={isPending}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    units?.map((unit) => (
                                        <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Reason</Label>
                        <Textarea
                            placeholder="Describe the reason"
                            className="resize-none"
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <span className="text-sm text-muted-foreground">at least 10 characters</span>
                    </div>

                    <Button disabled={isPending || !reason || !unit} onClick={handleMigration}>Apply</Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}