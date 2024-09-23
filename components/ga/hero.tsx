import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex w-full flex-row justify-center items-center relative">
      <div className="flex flex-col w-full overflow-hidden pt-8 relative">
        <Image
          src="/beams.jpg"
          alt="background image"
          width={1308}
          height={1000}
          className="absolute w-full h-full z-1 opacity-70 dark:invert dark:hidden select-none pointer-events-none"
        />
        <div className="absolute z-[2] inset-0 bg-[url(/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] translate-y-[-2px] dark:invert"></div>
        <div className="w-full flex flex-col justify-center items-center">
          <Image
            src="/booster-logo.webp"
            alt="giveaway booster logo"
            width={600}
            height={600}
            className="h-auto w-[55vw] lg:w-[30vw] relative z-[4]"
          />
        </div>
        <div className="absolute mt-[20vw] z-[3] font-jaro font-normal w-full text-center overflow-hidden">
          <h1 className="text-[40vw] leading-[30vw] sm:text-[21vw] sm:leading-[17vw] text-[hsl(var(--background))] custom-stroke">
            LIGHT NOVEL
          </h1>
          <h1 className="text-[40vw] leading-[33vw] sm:text-[24vw] sm:leading-[20vw] sm:mt-[-2vw] text-[hsl(var(--background))] custom-stroke">
            GIVEAWAY
          </h1>
          <h1 className="text-[40vw] leading-[33vw] sm:text-[26.3vw] sm:leading-[20vw] sm:mt-[-2vw] text-[hsl(var(--background))] custom-stroke">
            BOOSTER
          </h1>
        </div>
        <div className="w-full">
          <Image
            src="/mignon.png"
            alt="giveaway booster banner"
            width={1786}
            height={1070}
            quality={100}
            className="w-full h-auto relative z-[4] select-none pointer-events-none block mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
