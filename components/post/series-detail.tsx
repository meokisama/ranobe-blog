import { ArrowUpRight } from "lucide-react";
import type { SeriesDetail as Detail } from "@/lib/posts";

function Translation({ label, url }: { label?: string; url?: string }) {
  if (!label) return null;
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group/t inline-flex h-8 items-center gap-1.5 rounded-full border border-accent px-3 font-sans text-[0.8rem] font-medium !text-accent !no-underline transition-colors hover:bg-accent hover:!text-white"
    >
      {label}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/t:rotate-45" />
    </a>
  ) : (
    <span className="inline-flex h-8 items-center rounded-full border border-line px-3 font-sans text-[0.8rem] text-muted line-through decoration-muted/60">
      {label}
    </span>
  );
}

/** The light-novel index card. Props are flat so Keystatic can author it as an
 *  inline MDX block: `<SeriesDetail jp="…" vn="…" … />`. */
export default function SeriesDetail(props: Partial<Detail>) {
  const d = props;
  const rows = [
    { label: "Romaji", value: d.romaji },
    { label: "NXB", value: d.publisher },
    { label: "Tác giả", value: d.author },
    { label: "Minh hoạ", value: d.illustrator },
    { label: "Phát hành", value: d.release },
    { label: "Thể loại", value: d.category },
    { label: "Số tập", value: d.volume },
  ].filter((r) => r.value);

  return (
    <aside className="not-prose relative !my-12 !max-w-[46rem] overflow-hidden rounded-sm border border-line bg-surface font-sans md:!my-16">
      <div className="flex items-stretch">
        {/* Spine */}
        <div className="flex w-12 shrink-0 flex-col items-center justify-between bg-accent py-4 text-white md:w-14">
          <span className="font-jp text-lg font-bold">ラ</span>
          <span className="vertical-rl label text-[0.6rem] text-white/85">Thẻ thư mục</span>
        </div>

        <div className="min-w-0 flex-1 p-5 md:p-8">
          {d.jp && (
            <p lang="ja" className="font-jp text-[1.5rem] font-bold leading-snug text-ink md:text-[2rem]">
              {d.jp}
            </p>
          )}
          {d.vn && <p className="mt-2 font-serif text-[0.95rem] italic text-muted">{d.vn}</p>}

          <dl className="mt-6 grid grid-cols-1 border-t border-line text-[0.9rem] sm:grid-cols-2 sm:gap-x-8">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline gap-4 border-b border-line py-2.5">
                <dt className="label w-20 shrink-0 text-muted">{row.label}</dt>
                <dd className="min-w-0 leading-snug text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          {(d.en_trans || d.vi_trans) && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="label mr-2 text-muted">Bản dịch</span>
              <Translation label={d.en_trans} url={d.en_trans_url} />
              <Translation label={d.vi_trans} url={d.vi_trans_url} />
            </div>
          )}

          {d.safety && (
            <div className="mt-6 flex gap-3 border-t border-dashed border-line pt-5">
              <span className="label mt-0.5 shrink-0 self-start whitespace-nowrap rounded-full border border-gold px-2 py-1 text-[0.6rem] text-gold">Độ an toàn</span>
              <p className="font-serif text-[0.95rem] italic leading-relaxed text-ink">{d.safety}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
