import Footer from "@/components/common/Footer";
import SplashScreen from "@/components/common/SplashScreen";
import { ModeToggle } from "@/components/common/Toggle";
import Hero from "@/components/home/Hero";
import NewPosts from "@/components/home/NewPosts";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <SplashScreen />
      <ModeToggle />
      <Hero />
      <NewPosts />
      <Footer />
    </main>
  );
}
