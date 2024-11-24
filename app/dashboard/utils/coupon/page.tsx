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
import { CreateCouponButton } from "./_components/create-coupon-button";
import { CouponList } from "./_components/coupon-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Coupon",
    description: "Apbn scouts group",
};

const Coupon = async () => {

    const coupons = await db.coupon.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <ContentLayout title="Coupon">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Coupon</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <CreateCouponButton />
            <CouponList coupons={coupons} />
        </ContentLayout>
    )
}

export default Coupon;