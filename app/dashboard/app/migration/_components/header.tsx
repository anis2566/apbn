"use client"

import { SearchIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useEffect, useState } from "react"
import { AppStatus } from "@prisma/client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { useDebounce } from "@/hooks/use-debounce"

export const Header = () => {
    const [search, setSearch] = useState<string>("")
    const [status, setStatus] = useState<AppStatus>()

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchValue = useDebounce(search, 500)
    const params = Object.fromEntries(searchParams.entries());

    useEffect(() => {
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                search: searchValue
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [searchValue, router, pathname, searchParams])

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

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                status
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [status, router, pathname, searchParams])

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-x-3 shadow-sm shadow-primary p-2">
                <div className="flex items-center gap-x-3">
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
                    <div className="hidden sm:flex relative w-full max-w-[400px]">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full appearance-none bg-background pl-8 shadow-none"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                    <Button
                        variant="outline"
                        className="hidden md:flex text-rose-500"
                        onClick={() => {
                            setSearch("")
                            setStatus(undefined)
                            router.push(pathname)
                        }}
                    >
                        Reset
                    </Button>
                </div>
                <Select value={status} onValueChange={(value) => setStatus(value as AppStatus)}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(AppStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                                {status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="sm:hidden flex items-center gap-x-2">
                <div className="relative w-full">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full appearance-none bg-background pl-8 shadow-none"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>
                <Button
                    variant="outline"
                    className="md:hidden text-rose-500"
                    onClick={() => {
                        setSearch("")
                        setStatus(undefined)
                        router.push(pathname)
                    }}
                >
                    Reset
                </Button>
            </div>
        </div>
    )
}