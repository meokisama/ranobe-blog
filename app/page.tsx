import IconBar from "@/components/common/icon-bar";
import SplashScreen from "@/components/common/splash-screen";
import AuthorSection from "@/components/home/author";
import Bento from "@/components/home/bento";
import BoosterAds from "@/components/home/booster-ads";
import Hero from "@/components/home/hero";
import NewPosts from "@/components/home/new-posts";
import PageBackground from "@/components/common/page-background";
import { Promo } from "@/components/home/promo";
export default function Home() {
  return (
    <main>
      <SplashScreen />
      <IconBar />
      <div className="relative">
        <PageBackground dim />
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
