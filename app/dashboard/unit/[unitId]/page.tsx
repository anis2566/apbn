import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ContentLayout } from "@/components/dashboard"
import { AssignLeaderButton } from "@/components/dashboard/unit/assign-leader-button";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Image from "next/image";
import { RemoveLeaderButton } from "@/components/dashboard/unit/remove-leader-button";
import { cn } from "@/lib/utils";

interface Props {
    params: {
        unitId: string;
    }
}

const Unit = async ({ params: { unitId } }: Props) => {

    const unit = await db.unit.findUnique({
        where: {
            id: unitId
        },
        include: {
            leader: true
        }
    })

    if (!unit) redirect("/dashboard")

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
                        <BreadcrumbPage>Unit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Unit Leader</CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        unit?.leaderId ? (
                            <RemoveLeaderButton unitId={unit.id} />
                        ) : (
                            <AssignLeaderButton unitId={unit.id} />
                        )
                    }

                    <div 
                        className={cn(
                            "hidden flex-col md:flex-row items-center gap-4 p-4 md:p-6",
                            unit.leaderId && "flex"
                        )}
                    >
                        <Image
                            alt="Avatar"
                            className="rounded-full"
                            height="100"
                            src={unit.leader?.imageUrl || ""}
                            style={{
                                aspectRatio: "100/100",
                                objectFit: "cover",
                            }}
                            width="100"
                        />
                        <div className="space-y-1">
                            <div className="font-semibold text-xl text-primary">{unit.leader?.name}</div>
                            <p>{unit.leader?.phone}</p>
                            <p>{unit.leader?.apsId}</p>
                        </div>
                    </div>

                    {!unit?.leader?.id && (
                        <p className="text-muted-foreground text-center text-lx italic">No Unit Leader</p>
                    )}
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Unit