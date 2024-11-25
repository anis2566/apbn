"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import { CollapseMenuButton } from "./collapse-menu-button";
import { Role } from "@prisma/client";

interface MenuProps {
  isOpen: boolean | undefined;
  role: Role;
}

export function Menu({ isOpen, role }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  console.log(role)

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full list-none", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className={cn("text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate", menus.find(({ role: menuRole }) => !menuRole.includes(role)) && "hidden")}>
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus, role: menuRole }, index) =>
                  submenus.length === 0 ? (
                    <div
                      className={cn(
                        "w-full block",
                        !menuRole.includes(role) && "hidden"
                      )}
                      key={index}
                    >
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className={cn(
                                "w-full justify-start h-10 mb-1",
                                !menuRole.includes(role) && "hidden"
                              )}
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "w-full",
                        !submenus.find(({ role: menuRole }) => menuRole.includes(role)) &&
                        "hidden"
                      )}
                      key={index}
                    >
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                        role={role}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}