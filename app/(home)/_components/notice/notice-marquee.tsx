"use client"

import Marquee from "react-fast-marquee";

import { Notice } from "@prisma/client"

interface Props {
    notices: Notice[]
}

export const NoticeMarquee = ({ notices }: Props) => {
    return (
        <Marquee>
            {
                notices.map(notice => (
                    <div key={notice.id} className="w-full block">{notice.notice}</div>
                ))
            }
        </Marquee>
    )
}