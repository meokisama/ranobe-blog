import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Seal } from "@/components/site/logo";
import { AUTHORS, CATEGORIES } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line md:mt-48">
      <div className="gutter grid gap-12 pb-10 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <Seal className="size-12" />
          <p className="display mt-8 max-w-md text-3xl leading-[1.05] md:text-[2.6rem]">
            Đọc cho kĩ, khen cho thật, <em className="text-accent">chê cho đáng.</em>
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            Ranobe là một trang blog nhỏ viết về light novel: review, phân tích và những câu chuyện bên lề của văn học đại chúng Nhật Bản.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 md:col-span-6 md:col-start-7 md:grid-cols-3">
          <div>
            <p className="label text-muted">Khám phá</p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li><Link href="/" className="link-underline">Trang chủ</Link></li>
              <li><Link href="/blog" className="link-underline">Thư viện</Link></li>
              <li><Link href="/blog/category" className="link-underline">Chuyên mục</Link></li>
            </ul>
          </div>
          <div>
            <p className="label text-muted">Chuyên mục</p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/blog/category/${c.slug}`} className="link-underline">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label text-muted">Người viết</p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {AUTHORS.map((a) => (
                <li key={a.username}>
                  <a href={a.facebook} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1">
                    <span className="link-underline">{a.username}</span>
                    <ArrowUpRight className="size-3.5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none relative select-none px-[2vw]">
        <p className="display text-center text-[31vw] italic leading-[0.72] tracking-[-0.06em] text-ink/[0.06] [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]">
          Ranobe
        </p>
      </div>

      <div className="gutter label absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 pb-5 text-muted">
        <span>© 2022-{new Date().getFullYear()} Ranobe</span>
        <span className="font-jp text-[0.8rem] normal-case tracking-[0.3em]">ライトノベルを、語ろう。</span>
        <span>Dựng bởi Meoki</span>
      </div>
    </footer>
  );
}
