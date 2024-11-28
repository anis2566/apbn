import React from 'react'
import { Suspense } from 'react'

import { ReidrectPage } from './_components/redirect-page'

const Page = () => {
    return (
        <Suspense fallback="Loading...">
            <ReidrectPage />
        </Suspense>
    )
}

export default Page
