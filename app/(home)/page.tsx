import { Metadata } from "next";

import { Committee } from "./_components/committee";
import { Events } from "./_components/events";
import { Hero } from "./_components/hero";
import { News } from "./_components/news";
import { Stat } from "./_components/stat";

export const metadata: Metadata = {
  title: "APBn Scouts Group",
  description: "Apbn scouts group",
};

export default async function Home() {
  return (
    <main className="w-full max-w-screen-xl mx-auto px-2 md:px-0">
      <Hero />
      <Stat />
      <News />
      <Events />
      <Committee />
    </main>
  );
}
