import Link from "next/link";
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
import { ContentLayout } from "../_components/content-layout";
import { EventList } from "./_components/event-list";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "APBn Scouts | Events",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
    }
}

const Events = async ({searchParams}:Props) => {
    const {page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 4;
    const currentPage = parseInt(page) || 1;

    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalEvent = await db.event.count()

    const totalPage = Math.ceil(totalEvent / itemsPerPage)

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
                        <BreadcrumbPage>Events</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EventList events={events} />
            <CustomPagination totalPage={totalPage} />
        </ContentLayout>
    )
}

export default Events