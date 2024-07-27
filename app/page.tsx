import SplashScreen from "@/components/common/splash-screen";
import { ModeToggle } from "@/components/common/toggle";
import AuthorSection from "@/components/home/author";
import Bento from "@/components/home/bento";
import BoosterAds from "@/components/home/booster-ads";
import Hero from "@/components/home/hero";
import NewPosts from "@/components/home/new-posts";

export default function Home() {
  return (
    <main>
      <SplashScreen />
      <ModeToggle />
      <Hero />
      <Bento />
      <AuthorSection />
      <BoosterAds />
      <NewPosts />
    </main>
  );
}
