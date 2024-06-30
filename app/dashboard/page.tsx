import { Calendar, Eye, Layers3, UserCog, Users } from "lucide-react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Status } from "@/schema/scout.schema";
import { db } from "@/lib/db";
import { ContentLayout } from "@/components/dashboard";
import { StatCard } from "@/components/dashboard/card";
import { TodoForm } from "@/components/dashboard/todo/todo-form";
import { TodoList } from "@/components/dashboard/todo";

export default async function Dashboard() {

  const scouts = await db.scout.findMany({
    where: {
      status: Status.Pending
    },
    include: {
      unit: {
        select: {
          id: true
        }
      },
    },
    take: 5
  })

  const todos = await db.todo.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 5
  })

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard title="Scouts" icon={Users} value={210} />
        <StatCard title="Units" icon={Layers3} value={7} />
        <StatCard title="Event" icon={Calendar} value={4} />
        <StatCard title="Commitee" icon={UserCog} value={15} />
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-8 mt-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Scout Request</CardTitle>
          </CardHeader>
          <CardContent>
            {
              scouts.length < 1 ? (
                <div className="min-h-[20vh] flex items-center justify-center italic text-center">No Scout Request</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      scouts.map(scout => (
                        <TableRow key={scout.id}>
                          <TableCell className="py-2">
                            <Avatar>
                              <AvatarImage src={scout.imageUrl} />
                              <AvatarFallback>{scout.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="py-2">{scout.name}</TableCell>
                          <TableCell className="py-2">
                            <Badge variant="outline">{scout.section}</Badge>
                          </TableCell>
                          <TableCell className="py-2">
                            <Button asChild variant="ghost" size="icon">
                              <Link href={`/dashboard/scout/${scout.id}`}>
                                <Eye className="w-5 h-5" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              )
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Todos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TodoForm />
            <TodoList todos={todos} />
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}