"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const Header = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = Object.fromEntries(searchParams.entries());

    const handleSortChange = (sort: string) => {
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                sort,
            }
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }

    const handlePerPageChange = (perPage: string) => {
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                perPage,
            }
        }, { skipNull: true, skipEmptyString: true })

        router.push(url)
    }

    return (
        <div className="flex items-center justify-between gap-x-3">
            <Select onValueChange={(value) => handlePerPageChange(value)}>
                <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Limit" />
                </SelectTrigger>
                <SelectContent>
                    {
                        ["6", "12", "20", "50"].map((v, i) => (
                            <SelectItem value={v} key={i}>{v}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleSortChange(value)}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    {
                        [{label: "Newest", value: "desc"},{label: "Oldest", value: "asc"}].map((v, i) => (
                            <SelectItem value={v.value} key={i}>{v.label}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}