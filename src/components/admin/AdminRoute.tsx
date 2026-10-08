"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

type AdminRouteType = {
    link: {
        url: string,
        text: string
        blank: boolean
    }
}

const AdminRoute = ({ link }: AdminRouteType) => {

    const pathname = usePathname()
    const isActive = pathname.endsWith(link.url)

    console.log(isActive);

    return (
        <Link
            className={`${isActive ? "bg-amber-400" : ""} font-bold text-lg border-t border-gray-200 p3 last-of-type:border-b p-3`}
            href={link.url}
            target={link.blank ? "_blank" : ""}
        >
            {link.text}
        </Link>
    )
}

export default AdminRoute