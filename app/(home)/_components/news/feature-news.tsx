import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import { News } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import Link from "next/link"

interface Props {
    news: News
}

export const FeatureNews = ({ news }: Props) => {
    return (
        <Card className="bg-muted">
            <CardContent className="pt-4 space-y-3">
                <div className="relative aspect-video">
                    <Image
                        src={news?.imageUrl}
                        alt="banner"
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <h4 className="text-xl font-semibold">{news?.title}</h4>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">{format(news?.createdAt, ("dd MMM yyyy"))}</p>
                    <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right" asChild>
                        <Link href={`/news/${news.id}`}>
                            Read More
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}