import Link from "next/link";
import { CalendarCheck, CalendarDays, CalendarFold, CalendarX, DollarSign, LogIn, MapPin, Proportions } from "lucide-react";
import Image from "next/image";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"

import { ListBox } from "@/components/list-box";
import { cn } from "@/lib/utils";
import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";

export const metadata: Metadata = {
    title: "APBn Scouts | Event Details",
    description: "Apbn scouts group",
};


interface Props {
    params: {
        id: string;
    }
}

const EventDetails = async ({ params: { id } }: Props) => {

    const event = await db.event.findUnique({
        where: {
            id: id
        }
    })
    if (!event) redirect("/scout")

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
                        <BreadcrumbPage>Event Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-4 space-y-6">
                <Button
                    className={cn(
                        "flex items-center gap-x-1 group w-full max-w-[130px]",
                        event.eventEnd <= new Date() ? "hidden" : ""
                    )}
                    asChild
                >
                    <Link href={`/scout/event/apply/${event.id}`}>
                        Join
                        <LogIn className="transition ease-in-out duration-300 group-hover:translate-x-2" />
                    </Link>
                </Button>
                <Card>
                    <CardContent className="grid md:grid-cols-2 gap-6 pt-4">
                        <div className="w-full aspect-video relative">
                            <Image
                                src={event.imageUrl}
                                alt="Banner"
                                fill
                                className="rounded-md object-contain"
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
            </div>
        </ContentLayout>
    )
}

export default EventDetails