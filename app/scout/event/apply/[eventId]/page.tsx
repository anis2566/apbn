import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/scout"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { EventAppplyForm } from "@/components/scout/event/apply";
import { getScout } from "@/services/user.service";

interface Props {
    params: {
        eventId: string;
    }
}

const EventApply = async ({params:{eventId}}:Props) => {

    const event = await db.event.findUnique({
        where: {
            id: eventId,
            eventEnd: {
                gte: new Date()
            }
        }
    })

    if(!event) redirect("/scout")

    const {scoutId} = await getScout()

    return (
        <ContentLayout title="Event">
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
                            <Link href="/scout/event">Events</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Apply</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EventAppplyForm event={event} scoutId={scoutId} />

        </ContentLayout>
    )
}

export default EventApply