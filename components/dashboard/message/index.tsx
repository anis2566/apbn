import { Message } from "@prisma/client"
import { format } from "date-fns"
import { Eye, Mail, MessageSquareMore, User } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { ListBox } from "@/components/list-box"
import { Empty } from "@/components/empty"

interface Props {
    messages: Message[]
}

export const MessageList = ({ messages }: Props) => {
    return (
        <>
            {
                messages.length < 1 ? (
                    <Empty title="No Message Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                messages.map(message => (
                                    <TableRow key={message.id}>
                                        <TableCell className="py-3">{message.name}</TableCell>
                                        <TableCell className="py-3">{message.email}</TableCell>
                                        <TableCell className="py-3">
                                            {format(message.createdAt, "dd MMM yyyy")}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="w-5 h-5" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Message Details</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <ListBox title="Name" description={message.name} icon={User} />
                                                        <ListBox title="Email" description={message.email} icon={Mail} />
                                                        <ListBox title="Message" description={message.message} icon={MessageSquareMore} />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

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