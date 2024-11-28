"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export const ReidrectPage = () => {
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get("redirectUrl")


    useEffect(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl
        }
    }, [redirectUrl])

    return null
}