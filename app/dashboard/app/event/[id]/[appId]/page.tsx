import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
    params: {
        id: string;
        appId: string;
    }
}


const Members = async ({ params: { appId, id } }: Props) => {
    const application = await db.campApplication.findUnique({
        where: {
            eventId: id,
            id: appId
        },
        include: {
            members: true
        }
    })

    if (!application) redirect("/dashboard")

    return (
        <ContentLayout title="Applications">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Members</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Member List</CardTitle>
                    <CardDescription>A collection of application members.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SL</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Class</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                application.members.map((member, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{member.name}</TableCell>
                                        <TableCell>{member.phone}</TableCell>
                                        <TableCell>{member.role}</TableCell>
                                        <TableCell>{member.section}</TableCell>
                                        <TableCell>{member.class}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Members
