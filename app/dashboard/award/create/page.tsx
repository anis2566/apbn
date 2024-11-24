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
import { AwardForm } from "./_components/award-form";

export const metadata: Metadata = {
  title: "APBn Scouts | Create Award",
  description: "Apbn scouts group",
};

const CreateUnit = () => {
    return (
        <ContentLayout title="Award">
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
                    <Link href="/dashboard/award">Award</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Create</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <AwardForm />
        </ContentLayout>
    )
}

export default CreateUnit