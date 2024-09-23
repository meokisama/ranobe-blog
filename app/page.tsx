import IconBar from "@/components/common/icon-bar";
import SplashScreen from "@/components/common/splash-screen";
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
      <IconBar />
      <div className="relative">
        <Image
          src="/beams.jpg"
          alt="background image"
          width={1308}
          height={1000}
          className="fixed w-full h-full z-[1] opacity-40 dark:invert dark:hidden select-none pointer-events-none"
        />
        <div className="relative z-[2]">
          <Hero />
          <Bento />
          <AuthorSection />
          <BoosterAds />
          <NewPosts />
        </div>
      </div>
    </main>
  );
}
