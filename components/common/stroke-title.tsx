// The large stroked NAVIRANOBE / THEMEOKI watermark behind blog pages.
// The "post" variant (article detail) uses larger mobile type than the "list"
// variant (blog index / category); tablet+ sizing is shared.
const VARIANTS = {
  post: {
    line1: "text-[50vw] leading-[40vw] sm:text-[21vw] sm:leading-[17vw]",
    line2: "text-[50vw] leading-[40vw] sm:text-[26.3vw] sm:leading-[20vw] sm:mt-[-2vw]",
  },
  list: {
    line1: "text-[40vw] leading-[30vw] sm:text-[21vw] sm:leading-[17vw]",
    line2: "text-[40vw] leading-[33vw] sm:text-[26.3vw] sm:leading-[20vw] sm:mt-[-2vw]",
  },
} as const;

export default function StrokeTitle({ variant = "list" }: { variant?: keyof typeof VARIANTS }) {
  const v = VARIANTS[variant];
  return (
    <div className="absolute z-2 select-none pointer-events-none font-jaro w-full text-center overflow-hidden backdrop-blur-sm">
      <h1 className={`${v.line1} text-background custom-stroke`}>NAVIRANOBE</h1>
      <h1 className={`${v.line2} text-background custom-stroke`}>THEMEOKI</h1>
    </div>
  );
}
