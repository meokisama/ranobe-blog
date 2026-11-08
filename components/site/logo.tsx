import { cn } from "@/lib/utils";

/** The hanko seal: a vermilion stamp carrying ラ (ra). */
export function Seal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("size-8", className)} aria-hidden>
      <rect width="64" height="64" rx="12" className="fill-accent" />
      <rect x="6" y="6" width="52" height="52" rx="7" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
      <g fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 19h22" />
        <path d="M16 30h32c0 12-7 19-19 21" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("display text-[1.45rem] italic leading-none tracking-[-0.04em]", className)}>
      Ranobe
    </span>
  );
}
