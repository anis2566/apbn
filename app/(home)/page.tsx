import { Events } from "@/components/home/event";
import { Hero } from "@/components/home/hero";
import { News } from "@/components/home/news";
import { Stat } from "@/components/home/stat";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="w-full max-w-screen-xl mx-auto px-2 md:px-0">
      <Hero />
      <Stat />
      <News />
      <Events />
      <ModeToggle />
      <div className="h-[100vh]"></div>
    </main>
  );
}
