import { SplitWords } from "@/components/ui/reveal";

/** Oversized page heading used on the library and category pages. */
export default function PageTitle({
  eyebrow,
  jp,
  title,
  description,
  count,
}: {
  eyebrow: string;
  jp: string;
  title: string;
  description?: string;
  count?: number;
}) {
  return (
    <header className="gutter relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-44">
      <p
        aria-hidden
        className="vertical-rl pointer-events-none absolute right-[clamp(1rem,4vw,3.5rem)] top-28 font-jp text-[clamp(4rem,11vw,10rem)] font-bold leading-none text-ink/[0.06] md:top-32"
      >
        {jp}
      </p>
      <p className="label page-enter flex items-center gap-3 text-muted">
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h1 className="display mt-6 max-w-[14ch] text-[clamp(3.2rem,10.5vw,10rem)] text-balance">
        <SplitWords text={title} onView={false} delay={0.1} />
      </h1>
      <div className="page-enter mt-8 flex max-w-2xl flex-col gap-4 [animation-delay:0.35s] md:flex-row md:items-baseline md:gap-8">
        {typeof count === "number" && (
          <p className="label shrink-0 text-accent">{String(count).padStart(3, "0")} bài viết</p>
        )}
        {description && <p className="leading-relaxed text-muted md:text-lg">{description}</p>}
      </div>
    </header>
  );
}
