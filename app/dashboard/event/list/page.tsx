import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ContentLayout } from "@/components/dashboard"
import { db } from "@/lib/db";
import { EventList } from "@/components/dashboard/event/event-list";
import { MigrationStatus } from "@/schema/migration.schema";

const Events = async () => {

    const events = await db.event.findMany({
        include: {
            applications: {
                where: {
                    status: MigrationStatus.Approved
                },
                select: {
                    id: true
                }
            }
        }
    })

    return (
        <ContentLayout title="Event">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Event List</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Event List</CardTitle>
                    <CardDescription>A collection of event.</CardDescription>
                </CardHeader>
                <CardContent>
                    <EventList events={events} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Events