"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

function SectionHead({ index, jp, title, href, cta }: { index: string; jp: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
      <div className="flex items-baseline gap-4">
        <span className="label text-accent">{index}</span>
        <h2 className="display text-[clamp(2.2rem,5.2vw,4.6rem)]">
          <SplitWords text={title} />
        </h2>
        <span className="hidden font-jp text-lg text-muted sm:inline">{jp}</span>
      </div>
      {href && (
        <Link href={href} className="group label hidden shrink-0 items-center gap-2 pb-2 text-muted transition-colors hover:text-ink sm:flex">
          {cta}
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
        </Link>
      )}
    </div>
  );
}

export { SectionHead };

export default function Latest({ posts }: { posts: Post[] }) {
  const [lead, ...rest] = posts;
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section id="moi-nhat" className="gutter scroll-mt-24 pt-24 md:pt-36">
      <SectionHead index="01" jp="新着" title="Vừa lên kệ" href="/blog" cta="Tất cả bài viết" />

      <div className="mt-10 grid gap-x-10 gap-y-14 lg:grid-cols-12">
        {/* Lead story */}
        <Reveal className="lg:col-span-7">
          <Link ref={ref} href={`/blog/${lead.slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface">
              <motion.div style={{ y }} className="absolute inset-[-10%_0]">
                <Image
                  src={lead.thumbnail}
                  alt={lead.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              {lead.jp && (
                <p className="vertical-rl absolute right-5 top-5 max-h-[80%] font-jp text-lg font-bold leading-snug tracking-[0.2em] text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.7)] md:text-2xl">
                  {lead.jp}
                </p>
              )}
              <span className="label absolute bottom-5 left-5 rounded-full bg-accent px-3 py-2 text-white">Mới nhất</span>
            </div>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <p className="label text-muted">
                  <span className="text-accent">{lead.kicker || lead.category}</span> · {formatDate(lead.date)} · {lead.readingMinutes} phút đọc
                </p>
                <h3 className="display mt-4 text-[clamp(2rem,4.4vw,3.9rem)] text-balance">
                  <span className="link-underline bg-[length:0%_2px] group-hover:bg-[length:100%_2px]">{lead.title}</span>
                </h3>
                <p className="mt-5 line-clamp-3 max-w-2xl leading-relaxed text-muted">{lead.description}</p>
              </div>
              <span className="mt-1 hidden size-14 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-white sm:grid">
                <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.5} />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Runner-ups */}
        <div className="lg:col-span-5">
          <ol>
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <li className="border-b border-line first:border-t lg:first:border-t-0">
                  <Link href={`/blog/${post.slug}`} className="group flex gap-5 py-5">
                    <span className="label w-6 pt-1.5 text-muted transition-colors group-hover:text-accent">{String(i + 2).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className="label block text-muted">
                        {post.kicker || post.category} · {formatDate(post.date)}
                      </span>
                      <span className="mt-2.5 block font-display text-[1.35rem] leading-[1.15] tracking-[-0.015em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 md:text-2xl">
                        {post.title}
                      </span>
                    </span>
                    <span className="relative h-[4.5rem] w-24 shrink-0 overflow-hidden rounded-sm bg-surface md:h-20 md:w-28">
                      <Image
                        src={post.thumbnail}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover grayscale-[0.35] transition-all duration-700 ease-out-expo group-hover:scale-110 group-hover:grayscale-0"
                      />
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
