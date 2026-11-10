import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/home/latest";
import type { Post } from "@/lib/posts";
import { CATEGORIES, CHAPTER_NUMERALS } from "@/lib/site";

/** The table of contents: one row per category, styled like a book's 目次. */
export function ChapterList({ posts }: { posts: Post[] }) {
  return (
    <ol>
      {CATEGORIES.map((cat, i) => {
        const inCat = posts.filter((p) => p.categorySlug === cat.slug);
        return (
          <Reveal key={cat.slug} delay={i * 0.05}>
            <li className="border-b border-line">
              <Link
                href={`/blog/category/${cat.slug}`}
                className="group relative grid grid-cols-12 items-center gap-x-4 gap-y-3 overflow-hidden py-7 md:py-10"
              >
                {/* Ink wipe on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
                />

                <span className="relative col-span-12 flex items-baseline gap-3 md:col-span-2">
                  <span className="font-jp text-base text-accent transition-colors duration-500 group-hover:text-white md:pl-4">
                    第{CHAPTER_NUMERALS[i]}章
                  </span>
                  <span className="label text-muted transition-colors duration-500 group-hover:text-white/70">{cat.kanji}</span>
                </span>

                <span className="relative col-span-12 md:col-span-6">
                  <span className="display block text-[clamp(1.9rem,4.6vw,4.2rem)] transition-[transform,color] duration-700 ease-out-expo group-hover:translate-x-3 group-hover:text-white">
                    {cat.name}
                  </span>
                  <span className="mt-3 block max-w-xl text-sm leading-relaxed text-muted transition-[transform,color] duration-700 ease-out-expo group-hover:translate-x-3 group-hover:text-white/80 md:text-[0.95rem]">
                    {cat.description}
                  </span>
                </span>

                {/* Peek at the covers inside */}
                <span className="relative col-span-3 hidden h-24 items-center justify-end md:flex">
                  {inCat.slice(0, 3).map((p, j) => (
                    <span
                      key={p.slug}
                      className="relative -ml-8 h-20 w-28 shrink-0 overflow-hidden rounded-sm border border-white/20 opacity-0 shadow-xl transition-all duration-700 ease-out-expo group-hover:opacity-100"
                      style={{
                        transform: `translateY(${(j - 1) * 6}px) rotate(${(j - 1) * 5}deg)`,
                        transitionDelay: `${j * 60}ms`,
                      }}
                    >
                      <Image src={p.thumbnail} alt="" fill sizes="112px" className="object-cover" />
                    </span>
                  ))}
                </span>

                <span className="relative col-span-12 flex items-center justify-between gap-4 md:col-span-1 md:justify-end md:pr-4">
                  <span className="label text-muted transition-colors duration-500 group-hover:text-white md:hidden">{inCat.length} bài viết</span>
                  <span className="hidden flex-col items-end md:flex">
                    <span className="display text-4xl tabular-nums transition-colors duration-500 group-hover:text-white">
                      {String(inCat.length).padStart(2, "0")}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-white md:hidden" strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}

export default function Chapters({ posts }: { posts: Post[] }) {
  return (
    <section className="gutter pt-24 md:pt-36">
      <SectionHead index="02" jp="目次" title="Mục lục" href="/blog/category" cta="Xem chuyên mục" />
      <ChapterList posts={posts} />
    </section>
  );
}
