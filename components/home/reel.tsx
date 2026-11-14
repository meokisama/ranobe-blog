"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

export type ReelProps = {
  /** Section number shown in the corner, e.g. "03". */
  index: string;
  /** Small Japanese caption next to the number. */
  caption: string;
  /** Heading, split so the second half can be set in accented italics. */
  title: string;
  accent: string;
  description: string;
  href: string;
  /** Huge faint glyph behind the shelf. */
  backdrop: string;
  /** Whether the backdrop is Japanese (set in the mincho face) or a numeral. */
  backdropJp?: boolean;
  /** Shelves of covers; a labelled group gets a divider in front of it. */
  groups: { label?: string; posts: Post[] }[];
  /** The card that closes the shelf and links to the full category. */
  closing: { eyebrow: string; title: string; accent: string; text: string };
};

/** A pinned section whose shelf of covers slides sideways as the page scrolls. */
export default function Reel({ index, caption, title, accent, description, href, backdrop, backdropJp, groups, closing }: ReelProps) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section ref={section} className="relative mt-24 md:mt-36" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* Backdrop glyph */}
        <p
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 leading-none text-ink/[0.045]",
            backdropJp ? "right-[2vw] whitespace-nowrap font-jp text-[40vh] font-bold" : "display -right-[4vw] text-[62vh] italic",
          )}
        >
          {backdrop}
        </p>

        <div className="gutter relative flex items-end justify-between gap-6 pb-6 md:pb-9">
          <div>
            <p className="label flex items-center gap-3 text-accent">
              {index} <span className="font-jp text-sm normal-case tracking-normal text-muted">{caption}</span>
            </p>
            <h2 className="display mt-3 text-[clamp(2rem,5vw,4.4rem)]">
              {title} <em className="text-accent">{accent}</em>
            </h2>
          </div>
          <div className="hidden max-w-xs text-right md:block">
            <p className="text-sm leading-relaxed text-muted">{description}</p>
            <Link href={href} className="group label mt-4 inline-flex items-center gap-2 text-ink">
              <span className="link-underline pb-1">Mở chuyên mục</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        <motion.div ref={track} style={{ x }} className="relative flex w-max items-stretch gap-4 pl-[clamp(1rem,4vw,3.5rem)] pr-[12vw] will-change-transform md:gap-6">
          {groups.map((group, g) => (
            <div key={group.label ?? g} className="flex items-stretch gap-4 md:gap-6">
              {group.label && (
                <div className="flex w-[22vw] min-w-28 max-w-52 flex-col justify-between border-l border-line pl-4 md:pl-5">
                  <span className="label text-muted">Mùa</span>
                  <span className="display text-[clamp(3rem,7vw,6.5rem)] italic leading-none text-accent">{group.label}</span>
                </div>
              )}

              {group.posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative block h-[clamp(300px,52svh,520px)] w-[clamp(210px,24vw,340px)] shrink-0 overflow-hidden rounded-sm bg-surface"
                  draggable={false}
                >
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 24vw, 60vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.07]"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />

                  <div className="absolute inset-x-4 top-4 flex items-start justify-between text-white">
                    <span className="label">
                      {String(i + 1).padStart(2, "0")}
                      <span className="text-white/50">/{String(group.posts.length).padStart(2, "0")}</span>
                    </span>
                    {post.jp && (
                      <span className="vertical-rl max-h-[13rem] overflow-hidden font-jp text-[0.95rem] font-bold leading-snug tracking-[0.18em] drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                        {post.jp}
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <h3 className="font-display text-[1.25rem] leading-[1.12] tracking-[-0.01em] text-balance md:text-[1.45rem]">{post.title}</h3>
                    <span className="label mt-3 flex items-center gap-2 text-white/70">
                      <span className="h-px w-5 bg-accent transition-all duration-500 ease-out-expo group-hover:w-10" />
                      Đọc bài
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))}

          {/* Closing card */}
          <Link
            href={href}
            className="group flex h-[clamp(300px,52svh,520px)] w-[clamp(240px,28vw,400px)] shrink-0 flex-col justify-between rounded-sm border border-line p-6 transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-white md:p-8"
          >
            <span className="label text-muted transition-colors duration-500 group-hover:text-white/70">{closing.eyebrow}</span>
            <span>
              <span className="display block text-[clamp(2rem,3.6vw,3.4rem)]">
                {closing.title} <em>{closing.accent}</em>
              </span>
              <span className="mt-4 block text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/80">{closing.text}</span>
              <span className="mt-8 grid size-14 place-items-center rounded-full border border-current">
                <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.5} />
              </span>
            </span>
          </Link>
        </motion.div>

        {/* Progress */}
        <div className="gutter mt-7 md:mt-10">
          <div className="relative h-px bg-line">
            <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
