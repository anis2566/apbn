import { Metadata } from "next"
import { Suspense } from "react"

import { SearchPage } from "./_components/search-page"

export const metadata: Metadata = {
    title: "Search",
    description: "Search for a scout by APS ID",
}

const Search = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-full max-w-screen-xl mx-auto my-5">
                <SearchPage />
            </div>
        </Suspense >
    )
}

export default Search
