import Link from "next/link";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/prisma";
import { ContentLayout } from "../_components/content-layout";
import { DeleteButton } from "./_components/delete-button";
import { SwitchButton } from "./_components/switch-button";

export const metadata: Metadata = {
    title: "APBn Scouts | Notice",
    description: "Apbn scouts group",
};

const Notice = async () => {

    const notices = await db.notice.findMany({
        orderBy: {
            createdAt: "desc"
        },
    })

    return (
        <ContentLayout title="Notice">
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
                                    <SwitchButton notice={notice} />
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