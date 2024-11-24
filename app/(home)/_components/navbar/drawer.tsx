"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { tabs } from "./nav"


export const NavDrawer = () => {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-[250px] overflow-y-auto">
                <nav className="grid gap-3">
                    <div className="-mt-3">
                        <Logo />
                    </div>
                    <div className="space-y-1">
                        {
                            tabs.map((tab, i) => {
                                const active = pathname === tab.href;
                                return (
                                    <SheetClose asChild key={i}>
                                        <Link
                                            href={tab.href}
                                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", active && "bg-muted text-primary hover:text-primary")}
                                        >
                                            {tab.title}
                                        </Link>
                                    </SheetClose>
                                )
                            })
                        }
                    </div>
                </nav>
            </SheetContent>
        </Sheet>

    )
}