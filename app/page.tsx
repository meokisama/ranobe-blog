import Footer from "@/components/common/Footer";
import SplashScreen from "@/components/common/SplashScreen";
import Hero from "@/components/home/Hero";
import NewPosts from "@/components/home/NewPosts";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <SplashScreen />
      <Hero />
      <div>
        <NewPosts />
        <Footer />
      </div>
    </main>
  );
}
