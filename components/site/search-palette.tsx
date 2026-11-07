"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CornerDownLeft, Search } from "lucide-react";
import { cn, formatDate, removeAccents } from "@/lib/utils";

type Entry = {
  slug: string;
  title: string;
  category: string;
  date: string;
  thumbnail: string;
  t: string;
  d: string;
  c: string;
};

let indexPromise: Promise<Entry[]> | null = null;
const loadIndex = () => (indexPromise ??= fetch("/posts.json").then((r) => r.json()));

function search(index: Entry[], query: string): Entry[] {
  const terms = removeAccents(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return index.slice(0, 6);

  return index
    .map((entry) => {
      let score = 0;
      for (const term of terms) {
        const inTitle = entry.t.includes(term);
        const inDetail = entry.d.includes(term);
        const inContent = entry.c.includes(term);
        if (!inTitle && !inDetail && !inContent) return { entry, score: 0 };
        score += (inTitle ? 6 : 0) + (inDetail ? 3 : 0) + (inContent ? 1 : 0);
      }
      return { entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r) => r.entry);
}

export default function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Entry[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        show();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("ranobe:search", show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("ranobe:search", show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    loadIndex().then(setIndex).catch(() => {});
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    document.documentElement.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => search(index, query), [index, query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (slug: string) => {
    setOpen(false);
    router.push(`/blog/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      go(results[active].slug);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-3 pt-[10vh] md:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal
          aria-label="Tìm kiếm bài viết"
        >
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-20px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="size-5 shrink-0 text-muted" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Tìm tựa truyện, tác giả, nhà xuất bản…"
                className="h-16 w-full bg-transparent font-display text-xl outline-none focus-visible:outline-none placeholder:text-muted/70"
              />
              <kbd className="label rounded border border-line px-1.5 py-1 text-muted">Esc</kbd>
            </div>

            <div ref={listRef} data-lenis-prevent className="max-h-[56vh] overflow-y-auto overscroll-contain p-2">
              {!query && <p className="label px-3 pb-2 pt-3 text-muted">Mới nhất</p>}
              {results.map((r, i) => (
                <button
                  key={r.slug}
                  data-i={i}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r.slug)}
                  className={cn("flex w-full items-center gap-4 rounded-xl p-2.5 text-left transition-colors", i === active && "bg-ink/[0.07]")}
                >
                  <Image src={r.thumbnail} alt="" width={96} height={64} className="h-14 w-20 shrink-0 rounded-md object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[1.05rem]">{r.title}</span>
                    <span className="label mt-1.5 block text-muted">
                      {r.category} · {formatDate(r.date)}
                    </span>
                  </span>
                  <CornerDownLeft className={cn("mr-2 size-4 shrink-0 text-accent transition-opacity", i === active ? "opacity-100" : "opacity-0")} />
                </button>
              ))}
              {query && index.length > 0 && results.length === 0 && (
                <div className="px-4 py-12 text-center">
                  <p className="font-jp text-3xl text-accent">無</p>
                  <p className="mt-3 text-muted">Không tìm thấy gì cho “{query}”.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
