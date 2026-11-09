"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SplitWords } from "@/components/ui/reveal";
import type { HeroItem } from "@/components/home/hero-scene";
import { useSplashRevealed } from "@/lib/splash";

const HeroScene = dynamic(() => import("@/components/home/hero-scene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ items, total }: { items: (HeroItem & { category: string })[]; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const revealed = useSplashRevealed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const uiOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const current = hovered !== null ? items[hovered] : null;

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <h1 className="sr-only">Ranobe — Review &amp; phân tích Light Novel</h1>

      {/* Soft glow behind the ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-accent/[0.13] blur-[120px] dark:bg-accent/[0.16]"
      />

      <motion.div style={{ y: sceneY, opacity: sceneOpacity, scale: sceneScale }} className="absolute inset-0">
        {revealed && <HeroScene items={items} onHover={setHovered} />}
      </motion.div>

      {/* Vignette into the page colour */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      <motion.div style={{ opacity: uiOpacity }} className="pointer-events-none absolute inset-0">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="gutter label absolute inset-x-0 top-20 flex justify-between text-muted md:top-24"
        >
          <span>
            <span className="text-accent">●</span>&nbsp; Tạp chí light novel
          </span>
          <span className="hidden sm:block">Est. 2022 — Việt Nam</span>
          <span>N° {String(total).padStart(3, "0")} bài viết</span>
        </motion.div>

        {/* Vertical Japanese margins */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.4, ease: EASE }}
          className="vertical-rl absolute left-[clamp(1rem,4vw,3.5rem)] top-1/2 hidden -translate-y-1/2 font-jp text-[0.8rem] tracking-[0.5em] text-muted lg:block"
        >
          ライトノベルを読む<span className="text-accent">、</span>語る<span className="text-accent">、</span>愛する
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1.4, ease: EASE }}
          className="vertical-rl label absolute right-[clamp(1rem,4vw,3.5rem)] top-1/2 hidden -translate-y-1/2 text-muted lg:block"
        >
          Kéo để xoay — Nhấn để đọc
        </motion.p>

        {/* Bottom row */}
        <div className="gutter absolute inset-x-0 bottom-7 grid items-end gap-6 md:bottom-10 md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-4">
            <p className="display text-[clamp(1.6rem,2.6vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">
              <SplitWords text="Review, phân tích và những chuyện bên lề của" onView={false} delay={0.9} />{" "}
              <em className="text-accent">
                <SplitWords text="light novel." onView={false} delay={1.3} />
              </em>
            </p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 1, ease: EASE }}
              className="pointer-events-auto mt-6 flex items-center gap-3"
            >
              <Link
                href="/blog"
                className="group flex h-12 items-center gap-2 rounded-full bg-ink pl-6 pr-5 text-[0.9rem] font-medium text-bg transition-colors duration-300 hover:bg-accent hover:text-white"
              >
                Vào thư viện
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
              <a
                href="#moi-nhat"
                className="group flex h-12 items-center gap-2 rounded-full border border-line px-5 text-[0.9rem] backdrop-blur-sm transition-colors hover:border-ink"
              >
                Bài mới
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          <div className="hidden min-h-[5.5rem] md:col-span-5 md:col-start-8 md:block lg:col-span-4 lg:col-start-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.slug ?? "idle"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="border-t border-line pt-4 text-right"
              >
                {current ? (
                  <>
                    <p className="label text-accent">{current.category}</p>
                    <p className="mt-2.5 font-display text-xl leading-tight">{current.title}</p>
                  </>
                ) : (
                  <>
                    <p className="label text-muted">Vòng quay bìa sách</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {items.length} bài viết mới nhất đang trôi quanh đây. Rê chuột vào một tấm bìa để xem, nhấn để đọc.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
