import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LayoutGridIcon,
  Blocks,
  UtilityPole,
  LucideIcon,
  Pen,
  List,
  Radio,
  CircleCheck,
  BadgeX,
  BadgePercent,
  CircleDollarSign,
  Layers3,
  Medal,
  CalendarClock,
  FileStack,
  RefreshCcwDot,
  Ban,
  File,
  CalendarDays,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "",
          label: "Unit",
          active: pathname.includes("/dashboard/unit"),
          icon: Layers3,
          submenus: [
            {
              href: "/dashboard/unit/create",
              label: "Create",
              active: pathname === "/dashboard/unit/create",
              icon: Pen,
            },
            {
              href: "/dashboard/unit",
              label: "List",
              active: pathname === "/dashboard/unit",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Scout",
          active: pathname.includes("/utils"),
          icon: Users,
          submenus: [
            {
              href: "/dashboard/scout/request",
              label: "Request",
              active: pathname === "/dashboard/scout/request",
              icon: Radio,
            },
            {
              href: "/dashboard/scout/list",
              label: "List",
              active: pathname === "/dashboard/scout/list",
              icon: List,
            },
            {
              href: "/dashboard/scout/verified",
              label: "Verified",
              active: pathname === "/dashboard/scout/verified",
              icon: CircleCheck,
            },
            {
              href: "/dashboard/scout/suspended",
              label: "Suspended",
              active: pathname === "/dashboard/scout/suspended",
              icon: BadgeX,
            },
            {
              href: "/dashboard/scout/award",
              label: "Award",
              active: pathname === "/dashboard/scout/award",
              icon: Medal,
            },
          ],
        },
        {
          href: "",
          label: "Event",
          active: pathname.includes("/dashboard/app"),
          icon: CalendarDays,
          submenus: [
            {
              href: "/dashboard/event/create",
              label: "Create",
              active: pathname === "/dashboard/event/create",
              icon: Pen,
            },
            {
              href: "/dashboard/event/list",
              label: "List",
              active: pathname === "/dashboard/event/list",
              icon: List,
            },
          ],
        },
        {
          href: "",
          label: "Applications",
          active: pathname.includes("/dashboard/app"),
          icon: File,
          submenus: [
            {
              href: "/dashboard/app/migration",
              label: "Migration",
              active: pathname === "/dashboard/app/migration",
              icon: RefreshCcwDot,
            },
            {
              href: "/dashboard/app/ban",
              label: "Ban",
              active: pathname === "/dashboard/app/ban",
              icon: Ban,
            },
          ],
        },
        {
          href: "",
          label: "Utils",
          active: pathname.includes("/utils"),
          icon: UtilityPole,
          submenus: [
            {
              href: "/dashboard/utils/fee",
              label: "Fee",
              active: pathname === "/dashboard/utils/fee",
              icon: CircleDollarSign,
            },
            {
              href: "/dashboard/utils/coupon",
              label: "Coupon",
              active: pathname === "/dashboard/utils/coupon",
              icon: BadgePercent,
            },
          ],
        },
      ],
    },
  ];
}

export function getMenuListScout(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/scout",
          label: "Dashboard",
          active: pathname === "/scout",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Event",
          active: pathname.includes("/scout/event"),
          icon: CalendarClock,
          submenus: [
            {
              href: "/scout/event",
              label: "List",
              active: pathname === "/scout/event",
              icon: List,
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Unit",
          active: pathname.includes("/scout/unit"),
          icon: Layers3,
          submenus: [
            {
              href: "/scout/unit",
              label: "Manage",
              active: pathname === "/scout/unit",
              icon: Settings,
            },
            {
              href: "/scout/unit/request",
              label: "Request",
              active: pathname === "/scout/unit/request",
              icon: Radio,
            },
          ],
        },
      ],
    },
  ];
}
