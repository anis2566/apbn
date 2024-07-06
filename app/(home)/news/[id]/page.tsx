import { format } from "date-fns";
import { Pen } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Preview } from "@/components/preview";
import { db } from "@/lib/db";

interface Props {
    params: {
        id: string;
    }
}

const NewsDetails = async ({params:{id}}:Props) => {

    const news = await db.news.findUnique({
        where: {
            id
        }
    })

    if(!news) redirect("/")
    
    return (
        <div className="w-full max-w-screen-xl mx-auto py-4 md:py-16 space-y-8">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold">{news.title}</h1>
                <div className="flex items-center gap-x-3">
                    <Pen className="w-5 h-5" />
                    {format(news.createdAt, "dd MMM yyyy")}
                </div>
            </div>
            <div className="grid md:grid-cols-2">
                <div className="aspect-video relative">
                    <Image
                        src={news.imageUrl}
                        alt="News Image"
                        fill
                        className="rounded-md object-cover"
                    />
                </div>
            </div>
            <Preview value={news.news} />
        </div>
    )
}

export default NewsDetails