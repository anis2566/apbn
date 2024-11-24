import Link from "next/link"
import { MicVocal } from "lucide-react"
import { PublishStatus } from "@prisma/client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { db } from "@/lib/prisma"
import Marquee from "@/components/magicui/marquee"
import { FeatureNews } from "./feature-news"

export const News = async () => {
    const newses = await db.news.findMany({
        where: {
            status: PublishStatus.Publish
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="py-4 md:py-8 space-y-8">
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">Latest News</div>
                <p className="text-muted-foreground">Explore the latest update of our community.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {
                    newses[0] && (
                        <FeatureNews news={newses[0]} />
                    )
                }
                <Card className="bg-muted">
                    <CardHeader>
                        <CardTitle>More News</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Marquee repeat={4} pauseOnHover vertical className="[--duration:10s]">
                            {
                                newses.map(news => (
                                    <Link key={news.id} href={`/news/${news.id}`} className="shadow-sm shadow-primary/50 flex gap-x-3 min-h-14 px-4 gap-x-3 hover:underline">
                                        <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 w-10 h-10">
                                            <MicVocal className="text-indigo-500" />
                                        </div>
                                        <div>{news.title}</div>
                                    </Link>
                                ))
                            }
                        </Marquee>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}