import { cn } from "@/lib/utils";

const WORDS = [
  { text: "Rom-com", jp: "ラブコメ" },
  { text: "Isekai", jp: "異世界" },
  { text: "Bí ẩn", jp: "ミステリー" },
  { text: "Thanh xuân", jp: "青春" },
  { text: "Giả tưởng", jp: "ファンタジー" },
  { text: "Bi kịch", jp: "悲劇" },
];

function Row({ reverse }: { reverse?: boolean }) {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="flex overflow-hidden">
      <div className={cn("flex shrink-0 animate-marquee items-center", reverse && "[animation-direction:reverse]")}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className={cn("display px-[3vw] text-[clamp(3.5rem,11vw,10rem)] italic leading-[1.05]", i % 2 === (reverse ? 1 : 0) && "text-stroke")}>
                  {w.text}
                </span>
                <span className="font-jp text-[clamp(1rem,2vw,1.75rem)] text-accent">{w.jp}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-hidden className="mt-24 select-none border-y border-line py-6 md:mt-36 md:py-8">
      <Row />
    </section>
  );
}
