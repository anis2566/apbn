"use client"

import { Pen } from "lucide-react"
import { Coupon } from "@prisma/client"

import { Button } from "@/components/ui/button"

import { useUpdateCoupon } from "@/hooks/use-coupon"
import { Status } from "@/schema/coupon.schema"

interface EditButtonProps {
    coupon: Coupon;
}

export const EditButton = ({coupon}:EditButtonProps) => {
    const {onOpen} = useUpdateCoupon()
    return (
        <Button variant="ghost" className="w-full flex items-center gap-x-3 px-2 py-0 justify-start" onClick={() => onOpen({...coupon, status: coupon.status as Status}, coupon.id)}>
            <Pen className="w-4 h-4" />
            Edit
        </Button>
    )
}