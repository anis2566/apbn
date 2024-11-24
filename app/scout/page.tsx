import { format } from "date-fns"
import { Calendar, Download, Medal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils"
import { GET_SCOUT } from "@/services/user.service"
import { db } from "@/lib/prisma"
import { ContentLayout } from "./_components/content-layout"
import { Status } from "@prisma/client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "APBn Scouts | Dashboard",
  description: "Apbn scouts group",
};

const ScoutDashboard = async () => {
  const { scout } = await GET_SCOUT()

  const events = await db.event.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 1
  })

  const awards = await db.scoutAward.findMany({
    where: {
      scoutId: scout.id
    },
    include: {
      award: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <ContentLayout title="Dashboard">
      <div className="mt-4 space-y-8">
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
            <Image
              alt="Avatar"
              className="rounded-full"
              height="100"
              src={scout.imageUrl}
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100"
            />
            <div className="space-y-1">
              <div className="font-semibold text-xl">Hello, <span className="text-primary font-bold">{scout.name}</span></div>
              <div>{scout.phone}</div>
              <div>
                <Badge variant="outline">{scout.apsId}</Badge>
              </div>
              <Badge
                className={cn("capitalize text-white",
                  scout.status === Status.Pending && "bg-amber-500",
                  scout.status === Status.Active && "bg-green-500",
                  scout.status === Status.Verified && "bg-indigo-500",
                  scout.status === Status.Suspended && "bg-rose-500",
                )}
              >
                {scout.status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Upcoming Event</CardTitle>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {
                events.map(event => (
                  <div key={event.id} className="space-y-2">
                    <div className="relative aspect-video mx-auto">
                      <Image
                        src={event.imageUrl}
                        alt="Event"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <p className="text-xl truncate font-semibold">{event.title}</p>
                    <Button asChild>
                      <Link href={`/scout/event/${event.id}`}>View Event</Link>
                    </Button>

                  </div>
                ))
              }
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Awards</CardTitle>
              <Medal className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-8">
              {
                awards.length < 1 ? (
                  <div className="min-h-[20vh] flex items-center justify-center">
                    <p className="italic text-muted-foreground">No Award Yet.</p>
                  </div>
                ) : awards.map((item) => (
                  <div className="flex gap-x-4" key={item.scoutId}>
                    <div className="bg-green-800 flex items-center justify-center w-16 h-16 rounded-full flex-shrink-0">
                      <Medal className="text-white w-10 h-10" />
                    </div>
                    <div>

                      <h1 className="text-lg font-semibold text-primary">{item.award.title}</h1>
                      <p className="text-muted-foreground">{format(item.createdAt, "dd MMM yyyy")}</p>
                    </div>
                  </div>
                ))
              }
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Documents</CardTitle>
              <Download className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Scout Card</h3>
                <Button disabled={!scout.allowCard}>Download</Button>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Scout Form</h3>
                <Button asChild>
                  <Link href={`/scout/form/${scout.id}`} target="_blank">Download</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  )
}

export default ScoutDashboard