"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { type Layout, Live2DCanvas, type Live2DCanvasHandle, type ModelInfo } from "moe2d";
import { ChevronDown, Info, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WIDTH = 300;
const HEIGHT = 340;

const MODEL = "/live2d/zundamon/zundamon.model3.json";
const LAYOUT: Layout = { frame: [0, 0, 1, 0.7], fit: "cover", align: [0.5, 0], offset: [20, 0] };
// Motion groups the wand picks from.
const DANCE = ["Wave", "Laugh", "Point", "Think"];

const LINES = {
  // Morning, afternoon, evening, late night.
  greet: [
    "Chào buổi sáng nanoda! Tớ đợi bạn nãy giờ đó!",
    "Chào bạn nanoda! Hôm nay đọc review nào đây?",
    "Chào buổi tối nanoda~ Đọc một bài rồi đi ngủ nha.",
    "Khuya lắm rồi nanoda! Thức khuya là không tốt đâu đó!",
  ],
  tips: [
    "Muốn tìm bài nào thì bấm nút kính lúp góc dưới bên trái nanoda!",
    "Xem theo thể loại cho dễ tìm truyện hợp gu nanoda!",
    "Bài review này tớ đọc rồi, hay lắm nanoda!",
    "Mỏi mắt thì nhìn ra xa một chút nanoda.",
    "Đọc xong nhớ ăn một miếng zunda mochi nanoda!",
    "Light novel nào cũng hay, tớ không chọn được nanoda…",
  ],
  taps: ["Á! Đừng chọc tớ nanoda!", "Gì đó? Muốn chơi với tớ hả nanoda?", "Hehe, đậu edamame là số một nanoda!"],
} satisfies Record<string, string[]>;

// The tail hangs 6px below the bubble; the rest leaves room for motions that raise the head.
const GAP = 12;
const SLIDE_MS = 700;
const TYPE_MS = 60;
const TIP_MS = 5000;
const TIP_EVERY_MS = 30000;
const WIDE = "(min-width: 768px)";
const HIDDEN_KEY = "companion.hidden";
const REPO = "https://github.com/meokisama/moe2d";

function greeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return LINES.greet[0];
  if (hour >= 11 && hour < 18) return LINES.greet[1];
  if (hour >= 18 && hour < 23) return LINES.greet[2];
  return LINES.greet[3];
}

function pick<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)]!;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Opens the mouth wide on vowels, accented ones included, and a little on everything else.
function mouthFor(char: string) {
  if (/\s/.test(char)) return 0;
  return /[aeiouy]/i.test(char.normalize("NFD")[0]!) ? 0.8 : 0.3;
}

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {}
}

function subscribeWide(onChange: () => void) {
  const query = matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

type Tip = { chars: string[]; typed: number };

export function Companion() {
  const live2d = useRef<Live2DCanvasHandle>(null);
  const wide = useSyncExternalStore(
    subscribeWide,
    () => matchMedia(WIDE).matches,
    () => false,
  );
  const [hidden, setHidden] = useState(() => read(HIDDEN_KEY) === "1");
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [tip, setTip] = useState<Tip | null>(null);
  // px from the canvas top to the top of the drawn model; the bubble sits above it.
  const [head, setHead] = useState(0);
  const typing = useRef<ReturnType<typeof setTimeout>>(undefined);

  const active = wide && !hidden;
  // The canvas unmounts with it, so the next mount loads again.
  if (!active && ready) setReady(false);
  const shown = active && ready && !leaving;

  const mouth = useCallback((value: number) => {
    if (live2d.current) live2d.current.mouth = value;
  }, []);

  const say = useCallback(
    (text: string) => {
      clearTimeout(typing.current);
      const chars = [...text];
      let typed = 0;

      function step() {
        if (typed < chars.length) {
          mouth(mouthFor(chars[typed]!));
          typed++;
          setTip({ chars, typed });
          typing.current = setTimeout(step, TYPE_MS);
        } else {
          mouth(0);
          typing.current = setTimeout(() => setTip(null), TIP_MS);
        }
      }

      step();
    },
    [mouth],
  );

  useEffect(() => {
    if (!shown) return;
    const greet = setTimeout(() => say(greeting()), SLIDE_MS);
    const loop = setInterval(() => say(pick(LINES.tips)), TIP_EVERY_MS);
    return () => {
      clearTimeout(greet);
      clearInterval(loop);
      clearTimeout(typing.current);
      mouth(0);
      setTip(null);
    };
  }, [shown, say, mouth]);

  function loaded(_: ModelInfo, handle: Live2DCanvasHandle) {
    setHead(Math.max(0, handle.bounds()?.y ?? 0));
    setReady(true);
  }

  async function hide() {
    setLeaving(true);
    await wait(SLIDE_MS);
    write(HIDDEN_KEY, "1");
    setHidden(true);
    setLeaving(false);
  }

  function summon() {
    write(HIDDEN_KEY, null);
    setHidden(false);
  }

  if (!wide) return null;

  return (
    <>
      <div
        className={cn(
          "group pointer-events-none fixed right-0 bottom-0 z-30 transition-transform duration-700 ease-out",
          shown ? "translate-y-0" : "translate-y-full",
        )}
        style={{ width: WIDTH, height: HEIGHT }}
      >
        {active && (
          <Live2DCanvas
            ref={live2d}
            model={MODEL}
            layout={LAYOUT}
            className="pointer-events-auto"
            onLoad={loaded}
            onError={() => setHidden(true)}
            onTap={() => say(pick(LINES.taps))}
          />
        )}

        {tip && (
          <p
            className="absolute right-4 w-max max-w-72 rounded-3xl border-2 border-lime-300 bg-lime-50 px-5 py-3 text-base leading-relaxed text-green-950 shadow-[0_4px_0_0] shadow-lime-300/70 animate-in duration-300 zoom-in-90 fade-in slide-in-from-bottom-2"
            style={{ bottom: HEIGHT - head + GAP }}
          >
            {tip.chars.slice(0, tip.typed).join("")}
            <span className="invisible">{tip.chars.slice(tip.typed).join("")}</span>
            <span aria-hidden className="absolute -top-2 -right-1.5 rotate-12 text-base text-lime-400">✦</span>
            <span aria-hidden className="absolute right-20 -bottom-2 size-3 rotate-45 rounded-br-sm border-r-2 border-b-2 border-lime-300 bg-lime-50" />
          </p>
        )}

        <div className="pointer-events-auto absolute top-1/4 left-0 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <Button
            variant="outline"
            size="icon"
            title="Nhảy một điệu"
            aria-label="Nhảy một điệu"
            className="size-8 text-muted-foreground"
            onClick={() => void live2d.current?.motion(DANCE, { priority: "force" })}
          >
            <WandSparkles className="size-3.5" strokeWidth={1.5} />
          </Button>
          <Button variant="outline" size="icon" title="Cất Zundamon đi" aria-label="Cất Zundamon đi" className="size-8 text-muted-foreground" onClick={() => void hide()}>
            <ChevronDown className="size-3.5" strokeWidth={1.5} />
          </Button>
          <Button asChild variant="outline" size="icon" title="moe2d (GitHub)" className="size-8 text-muted-foreground">
            <a href={REPO} target="_blank" rel="noreferrer" aria-label="moe2d (GitHub)">
              <Info className="size-3.5" strokeWidth={1.5} />
            </a>
          </Button>
        </div>
      </div>

      {active && !ready && <p className="fixed right-6 bottom-4 z-30 text-xs text-muted-foreground">Đang tải…</p>}

      {hidden && (
        <Button
          variant="outline"
          title="Gọi Zundamon"
          className="fixed right-0 bottom-8 z-30 h-auto rounded-r-none border-r-0 px-2.5 py-4 text-sm tracking-widest text-muted-foreground shadow-sm [writing-mode:vertical-rl] hover:pr-3.5"
          onClick={summon}
        >
          Zundamon
        </Button>
      )}
    </>
  );
}
