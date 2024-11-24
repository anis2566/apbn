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
import { db } from "@/lib/prisma";
import { CreateSignatureButton } from "./_components/create-button";
import { SignatureList } from "./_components/signature-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Signature",
    description: "Apbn scouts group",
};


const Signature = async () => {

    const signatures = await db.signature.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <ContentLayout title="Signature">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Signature</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <CreateSignatureButton />
            <SignatureList signatures={signatures} />
        </ContentLayout>
    )
}

export default Signature