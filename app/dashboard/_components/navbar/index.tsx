import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "./user-nav";
import { Notification } from "@/components/notification";
import { SheetMenu } from "./drawer";
import { Role } from "@prisma/client";

interface NavbarProps {
  title: string;
  role: Role;
}

export function Navbar({ title, role }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-muted/40 shadow backdrop-blur supports-[backdrop-filter]:bg-muted/40 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu role={role} />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <Notification />
          <UserNav />
        </div>
      </div>
    </header>
  );
}