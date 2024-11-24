import { CheckIcon } from "lucide-react"
import { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
    title: "APBn Scouts | About",
    description: "Apbn scouts group",
};

const About = () => {
    return (
        <div className="py-4 md:py-16 w-full max-w-screen-xl mx-auto">
            <section className="w-full">
                <div className="container space-y-10 xl:space-y-16">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-16">
                        <div>
                            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                                Empowering the Next Generation of Leaders
                            </h1>
                        </div>
                        <div className="flex flex-col items-start space-y-4">
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                At our Scout organization, we believe in cultivating the character, leadership, and outdoor skills of
                                young people. Our mission is to prepare them for life is adventures and challenges.
                            </p>
                        </div>
                    </div>
                    <img
                        src="/about-banner.jpg"
                        width="1270"
                        height="500"
                        alt="Scouts in Nature"
                        className="mx-auto aspect-[5/2] overflow-hidden rounded-t-xl object-cover"
                    />
                </div>
            </section>
            <section className="container py-4 md:py-10">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        Our scout organization is dedicated to empowering young people through character development, leadership,
                        and outdoor adventure. We strive to instill values of service, teamwork, and personal growth in every scout.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        By fostering a love for the outdoors and a sense of community, we aim to inspire our scouts to become
                        responsible, compassionate, and engaged citizens who make a positive impact on the world around them.
                    </p>
                </div>
            </section>
            <section className="py-16 px-4">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Our Values</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 mr-4 text-primary" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Service</h3>
                                <p className="text-lg text-muted-foreground">
                                    We believe in giving back to our community and making a positive difference in the world.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 mr-4 text-primary" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Leadership</h3>
                                <p className="text-lg text-muted-foreground">
                                    We empower our scouts to develop their leadership skills and become confident, responsible
                                    decision-makers.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckIcon className="w-6 h-6 mr-4 text-primary" />
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Adventure</h3>
                                <p className="text-lg text-muted-foreground">
                                    We believe in the power of outdoor exploration and hands-on learning to foster personal growth and a
                                    love for nature.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="py-16">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Our History</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                        Our scout organization has a rich history dating back to the early 21th century. Founded in 2020, we have
                        been dedicated to empowering young people and promoting the values of scouting for over a century.
                    </p>
                    <p className="text-lg text-muted-foreground">
                        Throughout the decades, our organization has evolved to meet the changing needs of our community, but our
                        core mission and values have remained steadfast. Today, we continue to inspire and guide the next generation
                        of scouts, ensuring that the spirit of adventure and service lives on.
                    </p>
                </div>
            </section>
            <section className="py-16">
                <div className="text-center bg-muted p-4 rounded-md">
                    <h2 className="text-3xl font-bold mb-6">Join the Adventure</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Discover the excitement and camaraderie of our scout organization. Join us on unforgettable adventures and
                        become a part of our vibrant community.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/scout"
                            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            prefetch={false}
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About