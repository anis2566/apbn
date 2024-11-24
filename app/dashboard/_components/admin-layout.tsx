"use client";

import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Sidebar } from "./sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { Role } from "@prisma/client";

export default function AdminPanelLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: Role;
}) {
  const sidebar = useSidebar(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar role={role} />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-64"
        )}
      >
        {children}
      </main>
    </>
  );
}