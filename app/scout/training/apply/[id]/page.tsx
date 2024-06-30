import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/scout"
import { ApplyForm } from "@/components/scout/training/apply-form";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    }
}

const TrainingApply = async ({params:{id}}:Props) => {

    const app = await db.training.findUnique({
        where: {
            id
        }
    })

    console.log(app)
    if(!app) redirect("/scout")

    return (
        <ContentLayout title="Training">
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
                            <Link href="/scout/training">Trainings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Apply</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <ApplyForm trainingId={id} />
        </ContentLayout>
    )
}

export default TrainingApply;