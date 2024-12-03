"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { NavDrawer } from "./drawer"
import { Navs } from "./nav"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"
import { Search } from "./search"
import { Role } from "@prisma/client"

export const Navbar = () => {
    const { data: session, status } = useSession()

    return (
        <div className="w-full max-w-screen-xl mx-auto py-2 flex items-center justify-between fixed md:static top-0 left-0 z-50 bg-background px-2 md:px-0">
            <div className="md:hidden">
                <NavDrawer />
            </div>
            <div className="md:hidden">
                <Logo />
            </div>
            <Navs />
            <Search />
            <div className="flex items-center gap-x-2">
                <ModeToggle />
                {
                    status === "loading" && (
                        <Loader2 className="animate-spin h-5 w-5" />
                    )
                }
                {
                    status !== "loading" && !session && (
                        <Button variant="default" asChild>
                            <Link href="/auth/sign-in">Login</Link>
                        </Button>
                    )
                }
                {
                    status !== "loading" && session && (
                        <Button asChild>
                            <Link href={session.role === Role.Admin ? "/dashboard" : "/scout"}>Dashboard</Link>
                        </Button>
                    )
                }
            </div>
        </div>
    )
}
