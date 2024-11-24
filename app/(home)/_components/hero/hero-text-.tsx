"use client"

import { Highlight } from "@/components/aceternity/hero-highlight";
import { motion } from "framer-motion";


export const HeroText = () => {
    return (
        <motion.h1
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: [20, -5, 0],
            }}
            transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-[22px] md:text-4xl font-bold dark:text-white leading-relaxed lg:leading-snug text-center md:text-start mt-20 md:mt-0"
        >
            Explore, Learn, Connect with <br />
            <Highlight className="text-black dark:text-white">
                APBn Scout Group.
            </Highlight>
        </motion.h1>
    )
}