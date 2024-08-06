import SplashScreen from "@/components/common/splash-screen";
import { ModeToggle } from "@/components/common/toggle";
import AuthorSection from "@/components/home/author";
import Bento from "@/components/home/bento";
import BoosterAds from "@/components/home/booster-ads";
import Hero from "@/components/home/hero";
import NewPosts from "@/components/home/new-posts";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <SplashScreen />
      <ModeToggle />
      <div className="relative">
        <Image
          src="/beams.jpg"
          alt="background image"
          width={1308}
          height={1000}
          className="fixed w-full h-full -z-[100] opacity-40 dark:invert dark:hidden"
        />
        <Hero />
        <Bento />
        <AuthorSection />
        <BoosterAds />
        <NewPosts />
      </div>
    </main>
  );
}
