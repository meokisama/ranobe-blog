import SplashScreen from "@/components/common/splash-screen";
import { ModeToggle } from "@/components/common/toggle";
import Hero from "@/components/home/hero";
import NewPosts from "@/components/home/new-posts";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <SplashScreen />
      <ModeToggle />
      <Hero />
      <NewPosts />
    </main>
  );
}
