"use client"

import { Pen } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useCoupon } from "@/hooks/use-coupon"

export const CreateCoupon = () => {
    const {onOpen} = useCoupon()
    return (
        <Button className="mt-4 flex items-center gap-x-2" onClick={onOpen}>
            <Pen className="w-5 h-5" />
            Create
        </Button>
    )
}