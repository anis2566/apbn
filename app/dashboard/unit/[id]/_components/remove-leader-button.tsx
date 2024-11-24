"use client"

import { Button } from "@/components/ui/button"

import { useRemoveUnitLeader } from "@/hooks/use-unit"

interface Props {
    unitId: string;
}

export const RemoveLeaderButton = ({ unitId }: Props) => {
    const { onOpen } = useRemoveUnitLeader()

    return (
        <Button onClick={() => onOpen(unitId)} className="bg-rose-500 hover:bg-rose-700">Remove Leader</Button>
    )
}