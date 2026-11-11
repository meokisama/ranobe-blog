"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { Post } from "@/lib/posts";
import { CATEGORIES } from "@/lib/site";
import { cn, formatDate, removeAccents } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The post index: filter chips, instant search, and a list whose rows summon
 *  their cover next to the cursor. */
export default function Archive({ posts, counts, active }: { posts: Post[]; counts: Record<string, number>; active?: string }) {
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<Post | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  const haystack = useMemo(
    () => new Map(posts.map((p) => [p.slug, removeAccents(`${p.fullTitle} ${p.description} ${p.romaji} ${p.jp} ${p.author}`)])),
    [posts],
  );

  const filtered = useMemo(() => {
    const terms = removeAccents(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return posts;
    return posts.filter((p) => terms.every((t) => haystack.get(p.slug)!.includes(t)));
  }, [posts, query, haystack]);

  const byYear = useMemo(() => {
    const map = new Map<string, Post[]>();
    for (const p of filtered) {
      const year = p.date.slice(0, 4);
      map.set(year, [...(map.get(year) ?? []), p]);
    }
    return [...map.entries()];
  }, [filtered]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const chips = [
    { href: "/blog", label: "Tất cả", count: total, on: !active },
    ...CATEGORIES.map((c) => ({ href: `/blog/category/${c.slug}`, label: c.name, count: counts[c.slug] ?? 0, on: active === c.slug })),
  ];

  const order = new Map(filtered.map((p, i) => [p.slug, i + 1]));

  return (
    <section className="gutter">
      {/* Controls */}
      <div className="border-y border-line">
        <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <nav className="-mx-1 flex gap-1.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Lọc theo chuyên mục">
            {chips.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                scroll={false}
                className={cn(
                  "flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.85rem] transition-colors duration-300",
                  chip.on ? "border-ink bg-ink text-bg" : "border-line hover:border-ink",
                )}
              >
                {chip.label}
                <span className={cn("label text-[0.6rem]", chip.on ? "text-bg/60" : "text-muted")}>{chip.count}</span>
              </Link>
            ))}
          </nav>

          <label className="flex h-10 items-center gap-2.5 rounded-full border border-line px-4 transition-colors focus-within:border-ink md:w-72">
            <Search className="size-4 shrink-0 text-muted" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Lọc theo tên truyện…"
              className="w-full bg-transparent text-[0.9rem] outline-none focus-visible:outline-none placeholder:text-muted/70"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Xoá" className="text-muted hover:text-ink">
                <X className="size-4" />
              </button>
            )}
          </label>
        </div>
      </div>

      {/* List */}
      <div className="min-h-[40vh]" onPointerLeave={() => setHovered(null)}>
        {byYear.map(([year, group]) => (
          <div key={year} className="grid grid-cols-12 gap-x-4 border-b border-line">
            <div className="col-span-12 pt-8 md:col-span-2 md:pt-0">
              <p className="display sticky top-24 text-5xl italic text-accent md:py-7 md:text-6xl">{year}</p>
            </div>
            <ol className="col-span-12 md:col-span-10">
              {group.map((post) => {
                const index = order.get(post.slug) ?? 0;
                return (
                  <li key={post.slug} className="border-t border-line first:border-t-0 max-md:first:border-t">
                    <Link
                      href={`/blog/${post.slug}`}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(post)}
                      className="group grid grid-cols-12 items-center gap-x-4 py-5 md:py-6"
                    >
                      <span className="label col-span-1 hidden text-muted transition-colors group-hover:text-accent md:block">
                        {String(index).padStart(3, "0")}
                      </span>

                      <span className="col-span-4 md:hidden">
                        <span className="relative block aspect-[4/3] overflow-hidden rounded-sm bg-surface">
                          <Image src={post.thumbnail} alt="" fill sizes="33vw" className="object-cover" />
                        </span>
                      </span>

                      <span className="col-span-8 md:col-span-7">
                        <span className="label block text-muted md:hidden">
                          {post.kicker || post.category} · {formatDate(post.date)}
                        </span>
                        <span
                          className={cn(
                            "mt-2 block font-display text-[1.2rem] leading-[1.15] tracking-[-0.015em] transition-[transform,opacity] duration-500 ease-out-expo md:mt-0 md:text-[1.9rem] md:group-hover:translate-x-3",
                            hovered && hovered.slug !== post.slug && "md:opacity-35",
                          )}
                        >
                          {post.title}
                        </span>
                        {post.romaji && (
                          <span className="mt-1.5 hidden truncate text-[0.8rem] italic text-muted transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:block">
                            {post.romaji}
                          </span>
                        )}
                      </span>

                      <span className="label col-span-2 hidden text-muted md:block">{post.kicker || post.category}</span>
                      <span className="label col-span-2 hidden items-center justify-end gap-3 text-muted md:flex">
                        {formatDate(post.date)}
                        <ArrowUpRight className="size-4 text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-accent group-hover:opacity-100" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-28 text-center">
            <p className="font-jp text-6xl text-accent">無</p>
            <p className="display mt-6 text-3xl">Chưa có bài nào khớp với “{query}”.</p>
            <p className="mt-3 text-muted">Thử một từ khoá khác, hoặc tìm toàn văn bằng Ctrl + K.</p>
          </div>
        )}
      </div>

      {/* Cursor-following cover */}
      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative -mt-28 ml-8 h-52 w-80 overflow-hidden rounded-sm shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)]"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={hovered.slug}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={hovered.thumbnail} alt="" fill sizes="320px" className="object-cover" />
                  {hovered.jp && (
                    <span className="vertical-rl absolute right-3 top-3 max-h-[85%] overflow-hidden font-jp text-sm font-bold tracking-[0.15em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                      {hovered.jp}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
