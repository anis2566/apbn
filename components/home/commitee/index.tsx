import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-card"
import { db } from "@/lib/db";
import { CommiteeSection } from "@/schema/commitee.schema";

export const Commitee = async () => {

    const commitees = await db.commitee.findMany({
        where: {
            section: CommiteeSection.GroupCommitee
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="py-4 md:py-14 space-y-8">
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">Managing Commitee</div>
                <p className="text-muted-foreground">Have a look at our management staf.</p>
            </div>
            <div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={commitees}
                    direction="right"
                    speed="slow"
                />
            </div>
        </div>
    )
}
