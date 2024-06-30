import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/dashboard"
import { CreateSignature } from "@/components/dashboard/utils/signature/create-signature";
import { db } from "@/lib/db";
import { SignatureList } from "@/components/dashboard/utils/signature";

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

            <CreateSignature />
            <SignatureList signatures={signatures} />
        </ContentLayout>
    )
}

export default Signature