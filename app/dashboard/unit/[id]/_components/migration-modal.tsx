"use client"

import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { Section } from "@prisma/client"

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

import { useMigration } from "@/hooks/use-migration"
import { GET_UNITS_BY_SECTION, MIGRATE_SCOUT } from "../action"


export const MigrationModal = () => {
    const [section, setSection] = useState<Section>()
    const [unit, setUnit] = useState<string>("")

    const { open, onClose, scoutId } = useMigration()

    const { data: units } = useQuery({
        queryKey: ["get-units-by-section", section],
        queryFn: async () => {
            const res = await GET_UNITS_BY_SECTION(section as Section)
            return res.units
        },
        enabled: open
    })

    const { mutate: migrateScout, isPending } = useMutation({
        mutationFn: MIGRATE_SCOUT,
        onSuccess: (data) => {
            onClose()
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
        toast.loading("Migrating...", {
            id: "migrate-scout"
        })
        migrateScout({ scoutId, unitId: unit })
    }

    return (
        <Dialog open={open && !!scoutId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply Migration</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
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

                    <Button disabled={isPending} onClick={handleMigration}>Apply</Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}