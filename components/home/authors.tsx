import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/home/latest";
import { AUTHORS } from "@/lib/site";

export default function Authors({ counts, index = "04" }: { counts: Record<string, number>; index?: string }) {
  return (
    <section id="tac-gia" className="gutter scroll-mt-24 pt-24 md:pt-36">
      <SectionHead index={index} jp="筆者" title="Người chấp bút" />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {AUTHORS.map((author, i) => (
          <Reveal key={author.username} delay={i * 0.1}>
            <a
              href={author.facebook}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-sm p-6 text-white md:min-h-[36rem] md:p-9"
            >
              <Image
                src={author.cover}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/35" />

              <div className="relative flex items-start justify-between">
                <span className="label">
                  {String(i + 1).padStart(2, "0")} <span className="text-white/50">/ 02</span>
                </span>
                <span className="grid size-12 place-items-center rounded-full border border-white/30 backdrop-blur-sm transition-all duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" strokeWidth={1.5} />
                </span>
              </div>

              <div className="relative">
                <div className="flex items-center gap-4">
                  <Image
                    src={author.avatar}
                    alt={author.username}
                    width={72}
                    height={72}
                    className="size-16 rounded-full object-cover ring-1 ring-white/40 md:size-[4.5rem]"
                  />
                  <div>
                    <p className="display text-4xl italic md:text-5xl">{author.username}</p>
                    <p className="label mt-2 text-white/60">
                      a.k.a {author.nickname} · {counts[author.username] ?? 0} bài viết
                    </p>
                  </div>
                </div>
                <p className="mt-7 max-w-md font-display text-xl leading-snug md:text-2xl">“{author.name}”</p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">{author.role}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
