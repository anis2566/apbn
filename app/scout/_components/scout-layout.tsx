"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "./sidebar";
import { Pending } from "./pending";

interface Props {
    children: React.ReactNode,
    status: string;
    adminId: string;
}

export default function ScoutLayout({
    children,
    status,
    adminId
}: Props) {
    const sidebar = useSidebar(useSidebarToggle, (state) => state);
    const pathname = usePathname()
    const isNoLayout = pathname.includes("/scout/edit")
    const isFormPage = pathname.includes("/scout/form")

    if (!sidebar) return null;

    return (
        <>
            {
                !isNoLayout && !isFormPage && (
                    <Sidebar status={status} adminId={adminId} />
                )
            }
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
                    isNoLayout || isFormPage ? "ml-0 max-w-6xl mx-auto" : sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64",
                )}
            >
                {
                    status === "Pending" && !isFormPage && !isNoLayout ? <Pending adminId={adminId} /> : children
                }
            </main>
        </>
    );
}