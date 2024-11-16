import type { Metadata } from "next";
import IconBar from "@/components/common/icon-bar";
import Hero from "@/components/ga/hero";
import WelcomeScreen from "@/components/ga/welcome-screen";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Light Novel Giveaway Booster - Ranobe",
  };
}

export default function GiveAway() {
  return (
    <div>
      <WelcomeScreen />
      <IconBar />
      <Hero />
      <p className="mt-8 text-lg text-center">
        This page is in building process...
      </p>
    </div>
  );
}
