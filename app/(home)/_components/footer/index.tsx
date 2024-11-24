import { Copyright } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const Footer = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto py-3 border-t border-muted mt-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-x-2">
                <Copyright className="w-5 h-5 text-muted-foreground" />
                <p className="text-muted-foreground">{new Date().getFullYear()} APBn Scouts | All right reserved.</p>
            </div>
            <div className="flex items-center">
                <Button variant="link" asChild className="text-muted-foreground">
                    <Link href="/scout">Join Now</Link>
                </Button>
                <Button variant="link" asChild className="text-muted-foreground">
                    <Link href="/about">About</Link>
                </Button>
                <Button variant="link" asChild className="text-muted-foreground">
                    <Link href="/contact">Contact</Link>
                </Button>
            </div>
        </div>
    )
}
