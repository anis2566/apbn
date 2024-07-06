import Link from "next/link";
import { Pen } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { db } from "@/lib/db";
import { ContentLayout } from "@/components/dashboard"
import { EditButton } from "@/components/dashboard/notice/edit-button";
import { DeleteButton } from "@/components/dashboard/notice/delete-button";

const Notice = async () => {

    const notices = await db.notice.findMany({
        orderBy: {
            createdAt: "desc"
        },
    })

    return (
        <ContentLayout title="Message">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Notice</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Button asChild className="items-center gap-x-3 flex max-w-[130px] mt-4">
                <Link href={`/dashboard/notice/create`}>
                    <Pen className="w-5 h-5" />
                    Create
                </Link>
            </Button>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Notice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {
                        notices.map(notice => (
                            <div key={notice.id} className="p-2 bg-muted rounded-md space-y-2">
                                <p>{notice.notice}</p>
                                <div className="flex items-center gap-x-3">
                                    <EditButton notice={notice} />
                                    <DeleteButton id={notice.id} />
                                </div>
                            </div>
                        ))
                    }
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Notice;