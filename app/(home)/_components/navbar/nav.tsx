import { Tabs } from "@/components/aceternity/tabs";

export const tabs = [
    {
        title: "Home",
        value: "home",
        href: "/"
    },
    {
        title: "Event",
        value: "event",
        href: "/event"
    },
    {
        title: "About",
        value: "about",
        href: "/about"
    },
    {
        title: "Contact",
        value: "contact",
        href: "/contact"
    },
];

export const Navs = () => {
    return (
        <Tabs
            tabs={tabs}
            containerClassName="hidden md:flex"
        />
    )
}