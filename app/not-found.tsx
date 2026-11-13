import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Seal } from "@/components/site/logo";

export const metadata: Metadata = { title: "404 — Trang này đã thất lạc" };

export default function NotFound() {
  return (
    <main className="gutter relative flex min-h-[100svh] flex-col justify-between overflow-hidden py-8">
      <div className="grain" aria-hidden />
      <Link href="/" className="flex items-center gap-2.5" aria-label="Ranobe — trang chủ">
        <Seal />
        <span className="display text-[1.45rem] italic">Ranobe</span>
      </Link>

      <div className="relative">
        <p
          aria-hidden
          className="display pointer-events-none absolute -top-[0.62em] left-1/2 -translate-x-1/2 select-none text-[46vw] italic leading-none text-ink/[0.05]"
        >
          404
        </p>
        <div className="page-enter relative mx-auto max-w-3xl text-center">
          <p className="font-jp text-2xl tracking-[0.4em] text-accent">落丁</p>
          <h1 className="display mt-6 text-[clamp(2.6rem,8vw,6.5rem)] text-balance">
            Trang này đã <em className="text-accent">thất lạc</em> khỏi cuốn sách.
          </h1>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-muted">
            Có lẽ nó bị xé mất, hoặc chưa từng được in. Quay lại mục lục để tìm một câu chuyện khác nhé.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="group flex h-12 items-center gap-2 rounded-full bg-ink pl-6 pr-5 text-[0.9rem] font-medium text-bg transition-colors hover:bg-accent hover:text-white"
            >
              Về trang chủ
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
            <Link href="/blog" className="flex h-12 items-center rounded-full border border-line px-6 text-[0.9rem] transition-colors hover:border-ink">
              Vào thư viện
            </Link>
          </div>
        </div>
      </div>

      <p className="label flex justify-between text-muted">
        <span>Lỗi 404</span>
        <span className="font-jp text-[0.8rem] normal-case tracking-[0.3em]">ページが見つかりません</span>
      </p>
    </main>
  );
}
