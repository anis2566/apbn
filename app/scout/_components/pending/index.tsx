"use client"

import { ClockIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { ContentLayout } from "../content-layout"
import { GET_SCOUT } from "../../action"

interface Props {
    adminId: string;
}

export function Pending({ adminId }: Props) {
    const { data: session, status } = useSession()

    if (status !== "loading" && !session?.userId) redirect("/")

    const { data: scout, isLoading } = useQuery({
        queryKey: ["get-scout-pending", session?.userId],
        queryFn: async () => {
            if (!session?.userId) throw new Error("User ID is undefined")
            const res = await GET_SCOUT(session?.userId)
            return res.scout
        },
    })

    if (!isLoading && !scout?.id) redirect("/")

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
                    <CardContent>
                        {
                            scout?.isPaid ? (
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between gap-x-5">
                                        {
                                            isLoading ? (
                                                <div className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
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
                                        <Button className="w-full" asChild>
                                            <Link href={`/scout/form/${scout.id}`} target="_blank">
                                                Download Form
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button asChild className="w-full bg-indigo-500" variant="gooeyRight">
                                        <Link href={`/scout/support?user=${adminId}`}>Support</Link>
                                    </Button>
                                </div>
                            ) : (
                                <Button asChild className="w-full" variant="gooeyRight">
                                    <Link href={`/apply/payment/${scout?.id}`}>Pay Now</Link>
                                </Button>
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}