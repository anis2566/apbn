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
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
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
          icon: Blocks,
          submenus: [
            {
              href: "/dashboard/unit/create",
              label: "Create",
              active: pathname === "/dashboard/unit/create",
            },
            {
              href: "/dashboard/unit",
              label: "List",
              active: pathname === "/dashboard/unit",
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
            },
            {
              href: "/dashboard/scout/list",
              label: "List",
              active: pathname === "/dashboard/scout/list",
            },
            {
              href: "/dashboard/scout/verified",
              label: "Verified",
              active: pathname === "/dashboard/scout/verified",
            },
            {
              href: "/dashboard/scout/suspended",
              label: "Suspended",
              active: pathname === "/dashboard/scout/suspended",
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
            },
            {
              href: "/dashboard/utils/coupon",
              label: "Coupon",
              active: pathname === "/dashboard/utils/coupon",
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
          icon: Blocks,
          submenus: [
            {
              href: "/scout/event/list",
              label: "List",
              active: pathname === "/scout/event/list",
            },
          ],
        },
      ],
    },
  ];
}
