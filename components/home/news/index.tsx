import { NewsItem } from "./news-item"

export const News = () => {
    return (
        <div className="py-10 md:py-16 space-y-8">
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">Latest News</div>
                <p className="text-muted-foreground">Explore the latest update of our community.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <NewsItem />
                <NewsItem />
                <NewsItem />
            </div>
        </div>
    )
}