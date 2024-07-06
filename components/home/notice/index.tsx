import { db } from "@/lib/db"
import { Status } from "@/schema/notice.schema"
import { NoticeMarquee } from "./notice-mqrquee"
import { cn } from "@/lib/utils"

export const Notice = async () => {
    const notices = await db.notice.findMany({
        where: {
            status: Status.Active
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