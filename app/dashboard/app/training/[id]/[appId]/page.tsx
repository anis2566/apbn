import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { DownloadButton } from "./_components/download-button";

export const metadata: Metadata = {
    title: "APBn Scouts | Training Applications",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        appId: string;
    }
}

const ApplicationDetails = async ({ params: { appId } }: Props) => {

    const app = await db.trainingApplication.findUnique({
        where: {
            id: appId
        }
    })

    if (!app) redirect("/dashboard")

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
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/app/training">Trainings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Applications</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Application Details</CardTitle>
                    <CardDescription>A brief of application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h3 className="text-xl font-semibold">Attachments</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {
                            app.attachments.map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="relative aspect-video">
                                        <Image
                                            src={item}
                                            alt="Attachments"
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                    <DownloadButton url={item} />
                                </div>
                            ))
                        }
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default ApplicationDetails