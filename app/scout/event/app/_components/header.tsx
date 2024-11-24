"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { AppStatus } from "@prisma/client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export const Header = () => {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handlePerPageChange = (perPage: string) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                perPage,
            }
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }

    const handleStatusChange = (status: AppStatus) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                status,
            }
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }

    return (
        <div className="flex items-center justify-between gap-x-3 shadow-sm shadow-primary p-2">
            <div className="flex items-center gap-x-2">
                <Select onValueChange={(value) => handlePerPageChange(value)}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Limit" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            ["5", "10", "20", "50"].map((v, i) => (
                                <SelectItem value={v} key={i}>{v}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    className="hidden md:flex text-rose-500"
                    onClick={() => {
                        router.push(pathname)
                    }}
                >
                    Reset
                </Button>
            </div>

            <Select onValueChange={(value) => handleStatusChange(value as AppStatus)}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    {
                        Object.values(AppStatus).map((status) => (
                            <SelectItem value={status} key={status}>{status}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}