"use client"

import { Edit, EllipsisVertical, Trash2 } from "lucide-react"
import { Coupon } from "@prisma/client"
import { format } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { useDeleteCoupon, useUpdateCoupon } from "@/hooks/use-coupon"

interface FeeListProps {
    coupons: Coupon[]
}

export const CouponList = ({ coupons }: FeeListProps) => {
    const { onOpen: onOpenUpdate } = useUpdateCoupon()
    const { onOpen } = useDeleteCoupon()
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Coupon List</CardTitle>
                <CardDescription>
                    A collection of your coupon.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Expire</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            coupons.map(coupon => (
                                <TableRow key={coupon.id}>
                                    <TableCell>{coupon.title}</TableCell>
                                    <TableCell>{coupon.code}</TableCell>
                                    <TableCell>{coupon.value}</TableCell>
                                    <TableCell>{format(coupon.expire, "dd MMMM yyyy")}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "text-white bg-green-500",
                                                coupon.status === "Inactive" && "bg-rose-500"
                                            )}
                                        >
                                            {coupon.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpenUpdate(coupon, coupon.id)}>
                                                    <Edit className="w-5 h-5" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(coupon.id)}>
                                                    <Trash2 className="w-5 h-5 group-hover:text-rose-600" />
                                                    <p className="group-hover:text-rose-600">Delete</p>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}