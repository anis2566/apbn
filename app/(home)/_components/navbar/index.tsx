import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { NavDrawer } from "./drawer"
import { Navs } from "./nav"

export const Navbar = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto py-2 flex items-center justify-between fixed md:static top-0 left-0 z-50 bg-background px-2 md:px-0">
            <div className="md:hidden">
                <NavDrawer />
            </div>
            <div className="md:hidden">
                <Logo />
            </div>
            <Navs />
            <div className="flex items-center gap-x-2">
                <ModeToggle />
                <Button asChild>
                    <Link href="/scout">
                        Login
                    </Link>
                </Button>
            </div>
        </div>
    )
}