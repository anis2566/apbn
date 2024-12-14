import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const ApplicationList = () => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-3">Title</TableHead>
                        <TableHead className="py-3">Payment Status</TableHead>
                        <TableHead className="py-3">Status</TableHead>
                        <TableHead className="py-3">Applied At</TableHead>
                        <TableHead className="py-3">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                </TableBody>
            </Table>
        </>
    )
}