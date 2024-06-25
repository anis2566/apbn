import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Activity, Antenna, Building, Building2, Calendar, Ear, FileType2, FlaskRound, HeartPulse, House, LayoutPanelTop, Mailbox, PersonStanding, ScanFace, School, Shell, Store, University, User, Users } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ContentLayout } from "@/components/scout"
import { db } from "@/lib/db";
import { Status } from "@/schema/scout.schema";
import { cn, formattedStr } from "@/lib/utils";
import { ListBox } from "@/components/list-box";

interface Props {
    params: {
        scoutId: string;
    }
}

const ScoutDetails = async ({ params: { scoutId } }: Props) => {

    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        },
        include: {
            unit: true
        }
    })

    if (!scout) redirect("/dashboard")

    return (
        <ContentLayout title="Scout">
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
                            <Link href="/scout/unit">Unit</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Scout Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-4 space-y-8">
                <Card>
                    <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
                        <Image
                            alt="Avatar"
                            className="rounded-full"
                            height="100"
                            src={scout.imageUrl}
                            style={{
                                aspectRatio: "100/100",
                                objectFit: "cover",
                            }}
                            width="100"
                        />
                        <div className="space-y-1">
                            <div className="font-semibold text-xl text-primary">{scout.name}</div>
                            <div>{scout.email}</div>
                            <div>{scout.phone}</div>
                            <Badge
                                className={cn("capitalize text-white",
                                    scout.status === Status.Pending && "bg-amber-500",
                                    scout.status === Status.Active && "bg-green-500",
                                    scout.status === Status.Verified && "bg-indigo-500",
                                    scout.status === Status.Suspended && "bg-rose-500",
                                )}
                            >
                                {scout.status}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <ListBox icon={User} title="Name" description={scout.name} />
                                <ListBox icon={ScanFace} title="APS ID" description={scout.apsId || ""} />
                                <ListBox icon={Calendar} title="Date of Birth" date={scout.dob} />
                                <ListBox icon={Users} title="Father's Name" description={scout.fatherName} />
                                <ListBox icon={Users} title="Mother's Name" description={scout.motherName} />
                                <ListBox icon={PersonStanding} title="Gender" description={scout.gender} />
                                <ListBox icon={Store} title="Religion" description={scout.religion} />
                                <ListBox icon={HeartPulse} title="Blood Group" isUpperCase description={scout.bloodGroup || ""} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Address</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <ListBox icon={House} title="Village / House" description={scout.villageHouse} />
                                <ListBox icon={Antenna} title="Road / Block / Sector" description={scout.roadBlockSector} />
                                <ListBox icon={Building2} title="Division" description={scout.division} />
                                <ListBox icon={Building} title="District" description={scout.district} />
                                <ListBox icon={University} title="Thana" description={scout.thana} />
                                <ListBox icon={Mailbox} title="Post Code" description={scout.postCode || ""} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Scout Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                <ListBox icon={FileType2} isFormatedStr title="Scout Type" description={scout.scoutType} />
                                <ListBox icon={FlaskRound} title="Experience" badge={scout.experience} />
                                <ListBox icon={Calendar} title="Join Date" date={scout.joinDate || undefined} />
                                <ListBox icon={FileType2} isFormatedStr title="Member Type" description={scout.memberType} />
                                <ListBox icon={LayoutPanelTop} isFormatedStr title="Section" description={scout.section} />
                                <div className="flex gap-x-4">
                                    <div className="bg-slate-500 flex items-center justify-center w-10 h-10 rounded-md flex-shrink-0">
                                        <Ear className="text-white" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-semibold">Role</h4>
                                        <div className="flex items-center gap-x-1">
                                            {scout.role.map((v, i) => (
                                                <Badge key={i}>{formattedStr(v)}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <ListBox icon={Building2} title="Region" description={scout.scoutRegion} />
                                <ListBox icon={Building} title="District" description={scout.scoutDistrict} />
                                <ListBox icon={University} title="Upazilla" description={scout.scoutUpazilla || ""} />
                                <ListBox icon={School} title="Institute" description={scout.institute || ""} />
                                <ListBox icon={Activity} title="Class" description={scout.class || ""} />
                                <ListBox icon={Shell} title="Roll" description={scout.roll || ""} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ContentLayout>
    )
}

export default ScoutDetails