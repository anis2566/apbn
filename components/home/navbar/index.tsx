import Link from "next/link"

import { Button } from "@/components/ui/button"

import { Navs } from "./nav"
import { Logo } from "@/components/logo"

export const Navbar = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto py-2 flex items-center justify-between fixed md:static top-0 left-0 z-50 bg-background px-2 md:px-0">
            <div className="md:hidden">
                <Logo />
            </div>
            <Navs />
            <Button asChild>
                <Link href="/scout">
                    Scout Login
                </Link>
            </Button>
        </div>
    )
}