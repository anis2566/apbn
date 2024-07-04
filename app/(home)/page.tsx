import { Commitee } from "@/components/home/commitee";
import { Events } from "@/components/home/event";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { News } from "@/components/home/news";
import { Stat } from "@/components/home/stat";

export default function Home() {
  return (
    <main className="w-full max-w-screen-xl mx-auto px-2 md:px-0">
      <Hero />
      <Stat />
      <News />
      <Events />
      <Commitee />
      <Gallery />
    </main>
  );
}
