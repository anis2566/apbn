import { NoticeStatus } from "@prisma/client"

import { db } from "@/lib/prisma"
import { cn } from "@/lib/utils"
import { NoticeMarquee } from "./notice-marquee"

export const Notice = async () => {
    const notices = await db.notice.findMany({
        where: {
            status: NoticeStatus.Active
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className={cn(
            "w-full max-w-screen-xl mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-2",
            notices.length < 1 && "hidden"
        )}>
            <NoticeMarquee notices={notices} />
        </div>
    )
}