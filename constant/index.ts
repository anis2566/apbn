import {
  Layers3,
  LayoutDashboard,
  CirclePercent,
  Package,
  ShoppingCart,
  ShoppingBasket,
  MapPin,
  Users,
  Ribbon,
  TicketSlash,
  Feather,
  Popcorn,
  CalendarClock,
  ClipboardList,
  Store,
  UserCog,
  Radio,
  HandCoins,
  Flame,
  UserRoundCog,
  LucideIcon,
  LayoutList,
  ShieldCheck,
  ShieldX,
  Boxes
} from "lucide-react";

export const DASHBOARD_SIDEBAR = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Unit",
    href: "/dashboard/unit",
    icon: Boxes,
  },
  {
    label: "Scout",
    icon: Users,
    subSidebar: [
      {
        label: "Request",
        icon: Radio,
        href: "/dashboard/scout/request"
      },
      {
        label: "List",
        icon: LayoutList,
        href: "/dashboard/scout"
      },
      {
        label: "Verified",
        icon: ShieldCheck,
        href: "/dashboard/scout/verified"
      },
      {
        label: "Cancelled",
        icon: ShieldX,
        href: "/dashboard/scout/Cancelled"
      },
    ]
  },
];

export const BLOODGROUP = [
  {
    label: "A+",
    value: "a+",
  },
  {
    label: "A-",
    value: "a-",
  },
  {
    label: "B+",
    value: "b+",
  },
  {
    label: "AB+",
    value: "ab+",
  },
  {
    label: "AB-",
    value: "ab-",
  },
  {
    label: "O-",
    value: "o-",
  },
  {
    label: "O+",
    value: "o+",
  },
] as const;

export const MEMBERTYPE = [
  {
    label: "New Applicant",
    value: "new",
  },
  {
    label: "Scout",
    value: "scout",
  },
  {
    label: "Adult Leader",
    value: "adultLeader",
  },
] as const;

export const SCOUT_SECTION_TYPE = [
  {
    label: "Cub",
    value: "Cub",
  },
  {
    label: "Scout",
    value: "Scout",
  },
  {
    label: "Rover",
    value: "Rover",
  },
] as const;

export const BADGES = [
  {
    label: "নবাগত",
    value: "newbie",
  },
  {
    label: "সদস্য ব্যাজ",
    value: "memberBadge",
  },
  {
    label: "স্ট্যান্ডার্ড ব্যাজ",
    value: "standardBadge",
  },
  {
    label: "প্রোগ্রেস ব্যাজ",
    value: "progressBadge",
  },
  {
    label: "সার্ভিস ব্যাজ",
    value: "serviceBadge",
  },
  {
    label: "প্রেসিডেন্ট স্কাউট অ্যাওয়ার্ড",
    value: "presidentScoutBadge",
  },
] as const;

export const ROLES = [
  {
    label: "ইউনিট লিডার",
    value: "unitLeader",
  },
  {
    label: "Not Applicable",
    value: "notApplicable",
  },
] as const;