import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { EditEventForm } from "./_components/edit-event-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit Event",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const EditEvent = async ({ params: { id } }: Props) => {

    const event = await db.event.findUnique({
        where: {
            id: id
        }
    })

    if (!event) redirect("/dashboard")

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
                            <Link href="/dashboard/event">Event</Link>
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