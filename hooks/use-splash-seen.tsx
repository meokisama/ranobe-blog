"use client";
import { useEffect, useState } from "react";

export const SPLASH_SEEN_KEY = "splash_seen";

export function useSplashSeen() {
  const [seen] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SPLASH_SEEN_KEY) === "1";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return { seen, mounted };
}
