import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"

export const NewsItem = () => {
    return (
        <Card>
            <CardContent className="pt-4 space-y-3">
                <div className="relative aspect-video">
                    <Image
                        src="/hero-banner.png"
                        alt="banner"
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <h4 className="text-lg font-semibold">Exciting New Product Launch</h4>
                <p className="text-muted-foreground">Get ready for our latest and greatest product, coming soon to a store near you.</p>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">22 July 2024</p>
                    <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right">
                        Read More
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}