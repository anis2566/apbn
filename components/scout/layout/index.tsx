"use client";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "./sidebar";
import { useUser } from "@clerk/nextjs";
import { Pending } from "../pending";
import { usePathname } from "next/navigation";

export default function ScoutPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useSidebar(useSidebarToggle, (state) => state);
  const {user} = useUser()
  const pathname = usePathname()
  const isNoLayout = pathname.includes("/scout/edit")

  if (!sidebar) return null;

  if(user?.publicMetadata?.status === "pending" && !isNoLayout) {
    return <Pending />
  }

  return (
    <>
    {
      !isNoLayout && (
        <Sidebar />
      )
    }
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
          isNoLayout ? "ml-0 max-w-6xl mx-auto" : sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64",
        )}
      >
        {children}
      </main>
    </>
  );
}