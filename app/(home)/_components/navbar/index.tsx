import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { NavDrawer } from "./drawer"
import { Navs } from "./nav"
import { Search } from "./search"
import { Role } from "@prisma/client"
import { GET_USER_ROLE_STATUS } from "@/services/user.service"
import { LogoutButton } from "./logout-button"

export const Navbar = async () => {
    const { role, status, sessionRole } = await GET_USER_ROLE_STATUS()

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
                    !role && (
                        <Button variant="default" asChild>
                            <Link href="/auth/sign-in">Login</Link>
                        </Button>
                    )
                }
                {
                    role === Role.User && (
                        <Button variant="default" asChild>
                            <Link href="/apply">Join Now</Link>
                        </Button>
                    )
                }
                {
                    role && role !== sessionRole && (
                        <LogoutButton />
                    )
                }
                {
                    role && role === sessionRole && (
                        <Button asChild>
                            <Link href={role === Role.Admin ? "/dashboard" : "/scout"}>Dashboard</Link>
                        </Button>
                    )
                }
            </div>
        </div >
    )
}
