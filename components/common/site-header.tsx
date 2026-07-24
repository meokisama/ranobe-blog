"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bookmark, Library, Gift, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
};

const navItems: NavItem[] = [
  { href: "/", label: "Trang chủ", icon: Home },
  { href: "/blog", label: "Bài viết", icon: Bookmark },
  { href: "https://hub.ranobe.vn", label: "Ranobe Hub", icon: Library, external: true },
  { href: "/ga", label: "Giveaway Booster", icon: Gift },
];

// True when `item` is the page being viewed (external links never count). "/"
// matches only the home page; other links also match their subtree.
function isActive(pathname: string | null, item: NavItem): boolean {
  if (item.external || !pathname) return false;
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-orange-300/70 to-transparent" />
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="Trang chủ" className="group flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt=""
            width={525}
            height={476}
            priority
            className="h-10 w-auto transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
          />
          <Image src="/logo-text.png" alt="ranobe vn" width={825} height={302} priority className="h-13 w-auto" />
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300",
                  active
                    ? "bg-linear-to-br from-orange-400 via-amber-400 to-rose-400 text-white shadow-md shadow-orange-200/50 dark:shadow-orange-900/30"
                    : "text-muted-foreground hover:text-orange-700 dark:hover:text-orange-300",
                )}
              >
                {!active && (
                  <span className="pointer-events-none absolute inset-x-3.5 bottom-1 h-0.5 origin-center scale-x-0 rounded-full bg-linear-to-r from-orange-400 via-amber-400 to-rose-400 transition-transform duration-300 group-hover:scale-x-100" />
                )}
                <Icon className={cn("size-4 shrink-0 transition-transform duration-300", !active && "group-hover:-rotate-6 group-hover:scale-110")} />
                <span className="hidden sm:inline font-semibold text-[17px]">{item.label}</span>
                {active && (
                  <span className="ml-0.5 hidden size-1.5 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)] sm:inline-block" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
