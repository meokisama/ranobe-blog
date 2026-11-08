"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Search } from "lucide-react";
import { Seal, Wordmark } from "@/components/site/logo";
import { CATEGORIES, CHAPTER_NUMERALS } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/blog", label: "Thư viện", jp: "書庫" },
  { href: "/blog/category", label: "Chuyên mục", jp: "目次" },
  { href: "/#tac-gia", label: "Tác giả", jp: "筆者" },
];

export function openSearch() {
  window.dispatchEvent(new Event("ranobe:search"));
}

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Đổi giao diện sáng / tối"
      className={cn("group relative grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-ink", className)}
    >
      <span className="font-jp text-[15px] leading-none transition-transform duration-500 group-hover:rotate-[20deg] dark:hidden">紙</span>
      <span className="hidden font-jp text-[15px] leading-none transition-transform duration-500 group-hover:-rotate-[20deg] dark:block">夜</span>
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > prev);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "gutter flex h-16 items-center justify-between transition-[background-color,border-color,backdrop-filter] duration-500 md:h-[4.5rem]",
            scrolled && !open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent",
          )}
        >
          <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-2.5" aria-label="Ranobe — trang chủ">
            <Seal className="size-8 transition-transform duration-700 ease-out-expo group-hover:-rotate-12" />
            <Wordmark />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
            {NAV.map((item) => {
              const active = item.href === "/blog" ? pathname === "/blog" : pathname.startsWith(item.href) && !item.href.includes("#");
              return (
                <Link key={item.href} href={item.href} className="group relative flex items-baseline gap-1.5 py-2 text-[0.9rem]">
                  <span className={cn("font-jp text-[0.7rem] transition-colors", active ? "text-accent" : "text-muted group-hover:text-accent")}>
                    {item.jp}
                  </span>
                  <span className="link-underline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              className="group flex h-10 items-center gap-2.5 rounded-full border border-line px-3 transition-colors hover:border-ink md:pr-2"
              aria-label="Tìm kiếm"
            >
              <Search className="size-4" strokeWidth={1.5} />
              <span className="hidden text-[0.82rem] text-muted transition-colors group-hover:text-ink md:block">Tìm kiếm</span>
              <kbd className="label hidden rounded-full border border-line px-2 py-1.5 text-[0.6rem] text-muted md:block">Ctrl K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              className="relative grid size-10 place-items-center rounded-full border border-line md:hidden"
            >
              <span className={cn("absolute h-px w-4 bg-ink transition-transform duration-500 ease-out-expo", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-px w-4 bg-ink transition-transform duration-500 ease-out-expo", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="gutter fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-bg pb-8 pt-24 md:hidden"
          >
            <nav className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between border-b border-line py-5">
                    <span className="display text-5xl">{item.label}</span>
                    <span className="font-jp text-lg text-accent">{item.jp}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 grid gap-3">
              <p className="label text-muted">Chuyên mục</p>
              {CATEGORIES.map((c, i) => (
                <Link key={c.slug} href={`/blog/category/${c.slug}`} onClick={() => setOpen(false)} className="flex items-baseline gap-3 text-lg">
                  <span className="font-jp text-sm text-accent">第{CHAPTER_NUMERALS[i]}章</span>
                  {c.name}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
