import Image from "next/image"
import Link from "next/link"

import { HeroHighlight } from "@/components/aceternity/hero-highlight"
import { Button } from "@/components/ui/button"

import { HeroDesc } from "./hero-desc"
import { HeroText } from "./hero-text-"

export const Hero = () => {
    return (
        <HeroHighlight>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-7 px-2">
                    <HeroText />
                    <HeroDesc />
                    <div className="flex items-center justify-center md:justify-start gap-x-3">
                        <Button variant="outline" asChild>
                            <Link href="/about">
                                Learn More
                            </Link>
                        </Button>
                        <Button asChild variant="ringHover">
                            <Link href="/scout">
                                Join Now
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="w-full relative aspect-video">
                    <Image
                        src="/hero-banner.png"
                        alt="Hero"
                        fill
                        className="object-contain rounded-md"
                    />
                </div>
            </div>
        </HeroHighlight>
    )
}