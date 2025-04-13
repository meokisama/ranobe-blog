import IconBar from "@/components/common/icon-bar";
import SplashScreen from "@/components/common/splash-screen";
import AuthorSection from "@/components/home/author";
import Bento from "@/components/home/bento";
import BoosterAds from "@/components/home/booster-ads";
import Hero from "@/components/home/hero";
import NewPosts from "@/components/home/new-posts";
import Image from "next/image";
import { Promo } from "@/components/home/promo";
export default function Home() {
  return (
    <main>
      <SplashScreen />
      <IconBar />
      <div className="relative">
        <Image
          src="/sneaker.webp"
          alt="background image"
          width={1308}
          height={1000}
          className="fixed w-full h-auto z-1 dark:invert dark:hidden select-none pointer-events-none"
        />
        <Image
          src="/beams.jpg"
          alt="background image"
          width={1308}
          height={1000}
          className="fixed w-full h-full z-1 opacity-40 dark:invert dark:hidden select-none pointer-events-none"
        />
        <div className="relative z-2">
          <Hero />
          <Bento />
          <AuthorSection />
          <BoosterAds />
          <div className="mt-8 mx-4 lg:mx-0">
            <Promo />
          </div>
          <NewPosts />
        </div>
      </div>
    </main>
  );
}
