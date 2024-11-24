import { Medal, Tent, Users } from "lucide-react"
import { Status } from "@prisma/client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import NumberTicker from "@/components/magicui/number-ticker"
import { db } from "@/lib/prisma"

export const Stat = async () => {
    const scouts = await db.scout.count({
        where: {
            status: Status.Active
        }
    })

    const award = await db.award.count()

    return (
        <div className="py-10 md:py-16 grid md:grid-cols-3 gap-6">
            <Card className="bg-muted">
                <CardContent className="pt-4 flex flex-col items-center space-y-3">
                    <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4 w-10 h-10 mx-auto">
                        <Users
                        />
                    </div>
                    <Badge variant="secondary" className="text-primary px-2 text-xl">Scout</Badge>
                    <p className="whitespace-pre-wrap text-indigo-500 text-6xl font-medium tracking-tighter text-black dark:text-white text-center">
                        <NumberTicker value={scouts} />
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-muted">
                <CardContent className="pt-4 flex flex-col items-center space-y-3">
                    <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4 w-10 h-10 mx-auto">
                        <Tent
                        />
                    </div>
                    <Badge variant="secondary" className="text-primary px-2 text-xl">Camp</Badge>
                    <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white text-center">
                        <NumberTicker value={3} />
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-muted">
                <CardContent className="pt-4 flex flex-col items-center space-y-3">
                    <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4 w-10 h-10 mx-auto">
                        <Medal
                        />
                    </div>
                    <Badge variant="secondary" className="text-primary px-2 text-xl">Award</Badge>
                    <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white text-center">
                        <NumberTicker value={award} />
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}