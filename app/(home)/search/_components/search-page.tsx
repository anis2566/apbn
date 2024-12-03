"use client"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { GET_SCOUT_BY_APS_ID } from "../action"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { formatString } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export const SearchPage = () => {
    const searchParams = useSearchParams()
    const apsId = searchParams.get("apsId")

    const { data: scout, isLoading } = useQuery({
        queryKey: ["search-scout", apsId],
        queryFn: async () => {
            const res = await GET_SCOUT_BY_APS_ID(apsId)
            return res
        },
        enabled: !!apsId,
    })

    if (isLoading) {
        return <div className="w-full h-[40vh] flex items-center justify-center">
            <Loader2 className="animate-spin h-5 w-5" />
        </div>
    }

    if (scout === null) {
        return <div className="w-full h-[40vh] flex items-center justify-center">
            <p className="text-lg font-semibold text-muted-foreground italic">Scout not found</p>
        </div>
    }

    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center px-3">
            <div className="space-y-3">
                <div className="border p-2 relative aspect-square">
                    <Image src={scout?.imageUrl || ""} alt={scout?.name || ""} fill className="object-cover" />
                </div>
                <div className="space-y-2">
                    <p className="text-lg font-semibold">{scout?.name}</p>
                    <Badge className="capitalize">{formatString(scout?.role?.[0] || "")}</Badge>
                    <p className="text-sm text-muted-foreground">APS ID: {scout?.apsId}</p>
                    <p className="text-sm text-muted-foreground">BS ID: {}</p>
                </div>
            </div>
        </div>
    )
}