"use client";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "./sidebar";
import { useUser } from "@clerk/nextjs";
import { Pending } from "../pending";

export default function ScoutPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useSidebar(useSidebarToggle, (state) => state);

  if (!sidebar) return null;
  const {user} = useUser()

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64"
        )}
      >
        {
          user?.publicMetadata?.status === "pending" ? (
            <Pending />
          ) : children
        }
      </main>
    </>
  );
}