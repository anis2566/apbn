import { EventApplication, Scout } from "@prisma/client"
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

interface EventParticipantsWithScout extends EventApplication {
    scout: Scout | null;
}

interface EventParticipantsProps {
    participants: EventParticipantsWithScout[]
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
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>APS ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                participants.map(participant => (
                                    <TableRow key={participant.id}>
                                        <TableCell className="py-3">
                                            <Avatar>
                                                <AvatarImage src={participant.scout?.imageUrl} />
                                                <AvatarFallback>{participant.scout?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-3">{participant.scout?.name}</TableCell>
                                        <TableCell className="py-3">{participant.scout?.apsId}</TableCell>
                                        <TableCell className="py-3">{format(participant.updatedAt, "dd MMM yyyy")}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge className="bg-green-700">
                                                {participant.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                )
            }
        </>
    )
}