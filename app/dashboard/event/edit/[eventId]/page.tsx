import Link from "next/link";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/dashboard"
import { EditEventForm } from "@/components/dashboard/event/edit-event-form";
import { db } from "@/lib/db";

interface Props {
    params: {
        eventId: string;
    }
}

const EditEvent = async ( {params:{eventId}}:Props) => {

    const event = await db.event.findUnique({
        where: {
            id: eventId
        }
    })

    if(!event) redirect("/dashboard")

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
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/event/list">Event</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditEventForm event={event} />
        </ContentLayout>
    )
}

export default EditEvent