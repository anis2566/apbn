import { CalendarCheck, CalendarDays, CalendarFold, CalendarX, DollarSign, LogIn, MapPin, Proportions } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card"

import { ListBox } from "@/components/list-box";
import { db } from "@/lib/prisma";

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
    if (!event) redirect("/")

    return (
        <div className="py-4 md:py-16 w-full max-w-screen-xl mx-auto">
            <Card>
                <CardContent className="grid md:grid-cols-2 gap-6 pt-4">
                    <div className="w-full aspect-video relative">
                        <Image
                            src={event.imageUrl}
                            alt="Banner"
                            fill
                            className="rounded-contain object-cover"
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
    )
}

export default EventDetails