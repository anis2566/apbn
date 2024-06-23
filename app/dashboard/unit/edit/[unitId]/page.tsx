import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/dashboard"

import { db } from "@/lib/db";
import { EditUnitForm } from "@/components/dashboard/unit/edit-unit";

interface Props {
    params: {
        unitId: string;
    }
}

const EditUnit = async ({ params: { unitId } }: Props) => {
    
    const unit = await db.unit.findUnique({
        where: {
            id: unitId
        }
    })

    if(!unit) redirect("/dashboard")

    return (
        <ContentLayout title="Unit Edit">
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
                    <Link href="/dashboard/unit">Unit</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditUnitForm unit={unit} />
        </ContentLayout>
    )
}

export default EditUnit