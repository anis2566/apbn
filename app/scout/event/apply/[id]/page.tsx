import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/scout/_components/content-layout";
import { GET_SCOUT } from "@/services/user.service";
import { EventAppplyForm } from "./_components/apply-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Apply Event",
    description: "Apbn scouts group",
};


interface Props {
    params: {
        id: string;
    }
}

const EventApply = async ({ params: { id } }: Props) => {

    const event = await db.event.findUnique({
        where: {
            id: id,
            eventEnd: {
                gte: new Date()
            }
        }
    })

    if (!event) redirect("/scout")

    const { scout } = await GET_SCOUT()

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

            <EventAppplyForm event={event} scoutId={scout.id} />

        </ContentLayout>
    )
}

export default EventApply