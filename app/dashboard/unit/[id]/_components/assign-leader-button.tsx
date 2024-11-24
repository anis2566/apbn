"use client"

import { Button } from "@/components/ui/button"

import { useAssignUnitLeader } from "@/hooks/use-unit";

interface Props {
    unitId: string;
}

export const AssignLeaderButton = ({ unitId }: Props) => {
    const { onOpen } = useAssignUnitLeader()

    return (
        <Button onClick={() => onOpen(unitId)}>Assign Leader</Button>
    )
}