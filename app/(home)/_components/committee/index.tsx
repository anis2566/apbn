import { CommiteeSection } from "@prisma/client";

import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-card";

import { db } from "@/lib/prisma";

export const Committee = async () => {

    const groupCommitee = await db.committee.findFirst({
        where: {
            section: CommiteeSection.GroupCommitee
        }
    })

    if (!groupCommitee) return null;

    const committees = await db.committeeMember.findMany({
        where: {
            committeeId: groupCommitee.id
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
                    items={committees}
                    direction="right"
                    speed="slow"
                />
            </div>
        </div>
    )
}
