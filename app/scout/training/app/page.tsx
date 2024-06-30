import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"

import { db } from "@/lib/db";
import { ContentLayout } from "@/components/dashboard"

const TrainingApplications = () => {
    return (
        <ContentLayout title="Training">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/scout">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/scout/training">Trainings</Link>
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
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>A collection of training application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* <Header />
                    <ApplicationList applications={applications} />
                    <CustomPagination totalPage={totalPage} /> */}
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default TrainingApplications