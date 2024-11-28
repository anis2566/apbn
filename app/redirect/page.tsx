"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"

const ReidrectPage = () => {
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get("redirectUrl")


    useEffect(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl
        }
    }, [redirectUrl])

    return (
        <Suspense fallback="Loading...">
            Redirecting...
        </Suspense>
    )
}

export default ReidrectPage