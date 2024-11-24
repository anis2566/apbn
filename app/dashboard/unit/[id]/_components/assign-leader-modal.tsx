"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

import { useDebounce } from "@/hooks/use-debounce"
import { useAssignUnitLeader } from "@/hooks/use-unit"
import { cn } from "@/lib/utils"
import { ASSIGN_LEADER, GET_SCOUTS_BY_NAME } from "../action"

type Scout = {
    id: string;
    name: string;
    imageUrl: string;
    apsId: string | null;
}

export const AssignUnitLeaderModal = () => {
    const [search, setSearch] = useState<string>("")
    const [scoutId, setScoutId] = useState<string>("")
    const [scout, setScout] = useState<Scout>()

    const { open, unitId, onClose } = useAssignUnitLeader()
    const debounceValue = useDebounce(search, 500)

    const { data: scouts, isLoading } = useQuery({
        queryKey: ["get-scouts-for-leader", debounceValue],
        queryFn: async () => {
            const res = await GET_SCOUTS_BY_NAME(debounceValue)
            return res.scouts
        },
        enabled: open
    })

    const { mutate: assignLeader, isPending } = useMutation({
        mutationFn: ASSIGN_LEADER,
        onSuccess: (data) => {
            onClose()
            setScoutId("")
            toast.success(data.success, {
                id: "assign-leader"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "assign-leader"
            });
        }
    })

    const handleAssign = () => {
        toast.loading("Leader assigning...", {
            id: "assign-leader"
        })
        assignLeader({ unitId, leaderId: scoutId })
    }

    return (
        <Dialog open={open && !!unitId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign Leader</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <Input
                        type="search"
                        placeholder="Search scout by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={cn(
                            "flex",
                            scoutId && "hidden"
                        )}
                    />
                    <div
                        className={cn(
                            "block",
                            scoutId && "hidden"
                        )}
                    >
                        {scouts?.map(scout => (
                            <div key={scout.id} className="hover:bg-muted p-2 rounded-md flex items-center justify-between">
                                <div className="flex items-center gap-x-2">
                                    <Avatar>
                                        <AvatarImage src={scout?.imageUrl} />
                                        <AvatarFallback>{scout?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="">{scout?.name?.slice(0, 30)}</p>
                                </div>
                                <Checkbox
                                    checked={scoutId === scout.id}
                                    onCheckedChange={() => {
                                        setScoutId(scout?.id)
                                        setScout(scout)
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <Collapsible open={!!scoutId}>
                        <CollapsibleContent className="space-y-6">
                            <div className="hover:bg-muted p-2 rounded-md flex items-center justify-between">
                                <div className="flex items-center gap-x-2">
                                    <Avatar>
                                        <AvatarImage src={scout?.imageUrl} />
                                        <AvatarFallback>{scout?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="">{scout?.name?.slice(0, 30)}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setScoutId("")
                                    }}
                                    disabled={isPending}
                                >
                                    <Trash2 className="h-5 w-5 text-rose-500" />
                                </Button>
                            </div>
                            <Button onClick={handleAssign} disabled={isPending}>Submit</Button>
                        </CollapsibleContent>
                    </Collapsible>


                    <div
                        className={cn(
                            "hidden min-h-[10vh] items-center justify-center",
                            isLoading && "flex"
                        )}
                    >
                        <Loader className="w-5 h-5 animate-spin" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}