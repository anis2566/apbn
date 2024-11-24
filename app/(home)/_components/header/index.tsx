import { Mail, Phone } from "lucide-react"
import Link from "next/link"
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Button } from "@/components/ui/button"

import { Logo } from "@/components/logo";

export const Header = () => {
    return (
        <header className="hidden md:flex items-center justify-between w-full max-w-screen-xl mx-auto py-2 border-b border-muted">
            <div className="flex items-center gap-x-3">
                <Logo />
                <div>
                    <h1 className="text-2xl font-bold text-slate-700 dark:text-accent-foreground">Armed Police Battalion Scout Group</h1>
                    <h2 className="text-xl font-bold text-slate-700 dark:text-accent-foreground">আর্মড পুলিশ ব্যাটালিয়ন স্কাউট গ্রুপ</h2>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-x-2 text-md font-semibold text-muted-foreground">
                    <Phone className="text-primary dark:text-sky-500" />
                    01759-481477
                </div>
                <div className="flex items-center gap-x-2 text-md font-semibold text-muted-foreground">
                    <Mail className="text-primary dark:text-sky-500" />
                    apbnscouts@gmail.com
                </div>
                <div className="flex items-center -ml-2">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`https://facecook.com`}>
                            <FaFacebook className="w-5 h-5" color="#1877F2" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`https://x.com`}>
                            <FaXTwitter className="w-5 h-5" color="#1DA1F2" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`https://youtube.com`}>
                            <FaYoutube className="w-5 h-5" color="#FF0000" />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}