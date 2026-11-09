import { useSyncExternalStore } from "react";

export const SPLASH_SEEN_KEY = "splash_seen";

// Whether the home page is (about to be) visible: true straight away when the
// splash was already seen this session, otherwise once the splash says so.
let revealed = typeof window !== "undefined" && sessionStorage.getItem(SPLASH_SEEN_KEY) === "1";
const listeners = new Set<() => void>();

export function markSplashRevealed() {
  if (revealed) return;
  revealed = true;
  listeners.forEach((notify) => notify());
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

/** False while the splash screen still covers the page. */
export function useSplashRevealed() {
  return useSyncExternalStore(
    subscribe,
    () => revealed,
    () => false,
  );
}
