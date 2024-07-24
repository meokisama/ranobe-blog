import SplashScreen from "@/components/common/splash-screen";
import { ModeToggle } from "@/components/common/toggle";
import AuthorSection from "@/components/home/author";
import Hero from "@/components/home/hero";
import NewPosts from "@/components/home/new-posts";

export default function Home() {
  return (
    <main>
      <SplashScreen />
      <ModeToggle />
      <Hero />
      <AuthorSection />
      <NewPosts />
    </main>
  );
}
