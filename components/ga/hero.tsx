"use client";
import Image from "next/image";
import { motion } from "framer-motion";

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
        <div className="absolute z-[2] inset-0 bg-[url(/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] translate-y-[-2px] dark:invert opacity-70 md:opacity-100"></div>
        <motion.div
          initial={{ opacity: 0, y: "-100px" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 10,
            mass: 0.75,
            stiffness: 300,
            duration: 1,
            delay: 10.5,
          }}
          className="w-full flex flex-col justify-center items-center lg:items-end lg:absolute lg:top-[7vw] lg:right-[10vw] z-[50]"
        >
          <Image
            src="/booster-logo.webp"
            alt="giveaway booster logo"
            width={600}
            height={600}
            className="h-auto w-[55vw] lg:w-[30vw] relative z-[4]"
          />
        </motion.div>
        <div className="absolute mt-[35vw] sm:mt-[20vw] lg:mt-0 z-[3] font-jaro font-normal w-full text-center overflow-hidden opacity-50 md:opacity-100 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, x: "100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 9.5 }}
          >
            <h1 className="text-[19vw] leading-[19vw] sm:text-[21vw] sm:leading-[17vw] text-[hsl(var(--background))] custom-stroke">
              LIGHT NOVEL
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "-100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 9.6 }}
          >
            <h1 className="text-[19vw] leading-[20vw] sm:text-[24vw] sm:leading-[20vw] mt-[-4vw] sm:mt-[-2vw] text-[hsl(var(--background))] custom-stroke">
              GIVEAWAY
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 9.7 }}
          >
            <h1 className="text-[19vw] leading-[20vw] sm:text-[26.3vw] sm:leading-[20vw] mt-[-4vw] sm:mt-[-2vw] text-[hsl(var(--background))] custom-stroke">
              BOOSTER
            </h1>
          </motion.div>
        </div>
        <div className="w-full">
          <Image
            src="/mignon.png"
            alt="giveaway booster banner"
            width={1786}
            height={1070}
            quality={100}
            className="w-full h-auto relative z-[4] select-none pointer-events-none block mx-auto mt-[25vw] sm:mt-[15vw]"
          />
        </div>
      </div>
    </div>
  );
}
