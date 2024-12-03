"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Input } from "@/components/ui/input"

export const Search = () => {
    const [search, setSearch] = useState("")

    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/search?apsId=${search}`)
    }

    return (
        <form className="w-full max-w-[500px]" onSubmit={handleSubmit}>
            <Input type="search" placeholder="Search by APS ID" value={search} onChange={(e) => setSearch(e.target.value)} />
        </form>
    )
}