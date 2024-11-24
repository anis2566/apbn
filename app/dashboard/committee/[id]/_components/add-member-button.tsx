"use client"

import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useCommitteeMember } from "@/hooks/use-committee-member"

interface Props {
    id: string;
}

export const AddMemberButton = ({id}:Props) => {
    const {onOpen} = useCommitteeMember()

    return (
        <Button className="mt-4 flex items-center gap-x-2" onClick={() => onOpen(id)}>
            <PlusCircle className="w-5 h-5" />
            Add Member
        </Button>
    )
}