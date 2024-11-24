import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CalendarCheck, CalendarDays, CalendarFold, CalendarX, DollarSign, MapPin, Proportions } from "lucide-react";
import { Metadata } from "next";
import { AppStatus } from "@prisma/client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ListBox } from "@/components/list-box";
import { CustomPagination } from "@/components/custom-pagination";
import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { EventParticipants } from "./_components/participant-list";
import { Header } from "./_components/header";


export const metadata: Metadata = {
    title: "APBn Scouts | Event Details",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    },
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
}

const EventDetails = async ({ params: { id }, searchParams }: Props) => {

    const event = await db.event.findUnique({
        where: {
            id: id
        },
    })

    if (!event) redirect("/dashboard")

    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const participants = await db.eventApplication.findMany({
        where: {
            eventId: event.id,
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            }),
            status: AppStatus.Approved
        },
        include: {
            scout: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalParticipant = await db.eventApplication.count({
        where: {
            eventId: event.id,
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            }),
            status: AppStatus.Approved
        }
    })

    const totalPage = Math.ceil(totalParticipant / itemsPerPage)

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
                            <Link href="/dashboard/event">Events</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Event Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-4 space-y-6">
                <Card>
                    <CardContent className="grid md:grid-cols-2 gap-6 pt-4">
                        <div className="w-full aspect-video relative">
                            <Image
                                src={event.imageUrl}
                                alt="Banner"
                                fill
                            />
                        </div>
                        <div className="space-y-4">
                            <ListBox title="Title" icon={CalendarDays} description={event.title} />
                            <ListBox title="Description" icon={Proportions} description={event.description} />
                            <ListBox title="Venue" icon={MapPin} description={event.venue} />
                            <ListBox title="Entry Fee" icon={DollarSign} description={event.entryFee.toString()} />
                            <div className="grid md:grid-cols-2 gap-6">
                                <ListBox title="Event Start" icon={CalendarFold} date={event.eventStart} />
                                <ListBox title="Event End" icon={CalendarX} date={event.eventEnd} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <ListBox title="Registration Start" icon={CalendarCheck} date={event.registrationStart} />
                                <ListBox title="Registration End" icon={CalendarX} date={event.registrationEnd} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Participants</CardTitle>
                        <CardDescription>A collection of participants scout.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Header />
                        <EventParticipants participants={participants} />
                        <CustomPagination totalPage={totalPage} />
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}

export default EventDetails