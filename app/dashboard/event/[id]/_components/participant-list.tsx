import { CampApplication, CampMember, EventApplication, Scout } from "@prisma/client"
import { format } from "date-fns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Empty } from "@/components/empty"

interface EventParticipantsWithScout extends CampApplication {
    members: CampMember[]
}

interface EventParticipantsProps {
    participants: CampApplication[]
}

export const EventParticipants = ({ participants }: EventParticipantsProps) => {
    return (
        <>
            {
                participants.length < 1 ? (
                    <Empty title="No Participants Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        </TableBody>
                    </Table>
                )
            }
        </>
    )
}