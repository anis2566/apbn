"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import { Navs } from "@/app/(home)/_components/navbar/nav";

export const FloatingNav = ({
    className,
}: {
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.3) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                    width: visible ? '50%' : '100%',
                }}
                transition={{
                    duration: 0.6,
                }}
                className={cn(
                    "hidden md:flex justify-between items-center w-full max-w-screen-xl mx-auto bg-background fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 px-4 py-2 space-x-4",
                    className
                )}
            >
                <Logo />
                <Navs />
                <Button asChild>
                    <Link href="/scout">
                        Scout Login
                    </Link>
                </Button>
            </motion.div>
        </AnimatePresence>
    );
};
