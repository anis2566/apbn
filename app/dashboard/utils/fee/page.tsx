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
import { ContentLayout } from "../../_components/content-layout";
import { CreateFeeButton } from "./_components/create-fee-button";
import { db } from "@/lib/prisma";
import { FeeList } from "./_components/fee-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Fee",
    description: "Apbn scouts group",
};


const Fee = async () => {

    const fees = await db.fee.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <ContentLayout title="Fee">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Fee</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <CreateFeeButton />
            <FeeList fees={fees} />
        </ContentLayout>
    )
}

export default Fee;