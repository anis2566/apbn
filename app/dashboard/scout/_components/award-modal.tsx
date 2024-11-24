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
import { cn } from "@/lib/utils"
import { ASSIGN_AWARD, GET_AWARDS } from "../action"
import { useAssignAward } from "@/hooks/use-award"

type Award = {
    id: string;
    title: string;
    imageUrl: string;
}

export const AssignAwardrModal = () => {
    const [search, setSearch] = useState<string>("")
    const [awardId, setAwardId] = useState<string>("")
    const [award, setAward] = useState<Award>()

    const { open, scoutId, onClose } = useAssignAward()
    const debounceValue = useDebounce(search, 500)

    const { data: awards, isLoading } = useQuery({
        queryKey: ["get-awards-", debounceValue],
        queryFn: async () => {
            const res = await GET_AWARDS(debounceValue)
            return res.awards
        },
        enabled: open
    })

    const { mutate: assignAward, isPending } = useMutation({
        mutationFn: ASSIGN_AWARD,
        onSuccess: (data) => {
            onClose()
            setAwardId("")
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
        assignAward({ scoutId, awardId })
    }

    return (
        <Dialog open={open && !!scoutId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign Award</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <Input
                        type="search"
                        placeholder="Search scout by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={cn(
                            "flex",
                            awardId && "hidden"
                        )}
                    />
                    <div
                        className={cn(
                            "block",
                            awardId && "hidden"
                        )}
                    >
                        {awards?.map(award => (
                            <div key={award.id} className="hover:bg-muted p-2 rounded-md flex items-center justify-between">
                                <div className="flex items-center gap-x-2">
                                    <Avatar>
                                        <AvatarImage src={award?.imageUrl} />
                                        <AvatarFallback>{award?.title?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="">{award?.title?.slice(0, 30)}</p>
                                </div>
                                <Checkbox
                                    checked={awardId === award.id}
                                    onCheckedChange={() => {
                                        setAwardId(award.id)
                                        setAward(award)
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <Collapsible open={!!awardId}>
                        <CollapsibleContent className="space-y-6">
                            <div className="hover:bg-muted p-2 rounded-md flex items-center justify-between">
                                <div className="flex items-center gap-x-2">
                                    <Avatar>
                                        <AvatarImage src={award?.imageUrl} />
                                        <AvatarFallback>{award?.title?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="">{award?.title?.slice(0, 30)}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setAwardId("")
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