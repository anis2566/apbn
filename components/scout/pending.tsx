"use client"

import { ClockIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"

import { ContentLayout } from "."
import { GET_SCOUT_BY_CLERKID } from "@/actions/scout.action"
import { cn } from "@/lib/utils"

export function Pending() {
    const {userId} = useAuth()

    if(!userId) redirect("/")

    const {data: scout, isLoading} = useQuery({
        queryKey: ["get-scout-pending", userId],
        queryFn: async () => {
            const res = await GET_SCOUT_BY_CLERKID(userId)
            return res.scout
        },
        enabled: !!userId
    })

    if(!isLoading && !scout) redirect("/")

    return (
    <ContentLayout title="Pending">
        <div className="flex items-center justify-center h-[80vh]">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
            <CardHeader className="text-center">
            <ClockIcon className="h-12 w-12 text-yellow-500 mb-4 mx-auto" />
            <CardTitle className="text-2xl font-bold">Pending Account</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
                Your account is currently pending approval. Please contact our support team to resolve this issue.
            </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-x-5">
                {
                    isLoading ? (
                        <div className={cn(buttonVariants({variant: "outline"}), "w-full")}>
                            <Loader2 className="w-5 h-5 animate-spin" />
                        </div>
                    ) : (

                        <Button className="w-full" asChild variant="outline">
                            <Link href={`/scout/edit/${scout?.id}`}>
                                Edit Form
                            </Link>
                        </Button>
                    )
                }
                <Button className="w-full">
                    Download Form
                </Button>
            </CardContent>
        </Card>
        </div>
    </ContentLayout>
  )
}