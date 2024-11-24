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
import { UnitForm } from "./_components/unit-form";

export const metadata: Metadata = {
  title: "APBn Scouts | Create Unit",
  description: "Apbn scouts group",
};

const CreateUnit = () => {
    return (
        <ContentLayout title="Unit">
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
                    <BreadcrumbPage>Create</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <UnitForm />
        </ContentLayout>
    )
}

export default CreateUnit