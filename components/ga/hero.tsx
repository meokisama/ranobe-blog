"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Signature, Arrow } from "./signature";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import FacebookIcon from "@/components/common/facebook-icon";

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
        <div className="absolute z-2 inset-0 bg-[url(/grid.svg)] bg-top mask-[linear-gradient(180deg,white,rgba(255,255,255,0))] -translate-y-0.5 dark:invert opacity-70 md:opacity-100"></div>
        <div className="flex flex-row justify-center lg:justify-end items-center translate-x-[-9vw] lg:translate-y-[3vw] relative z-50">
          <div className="relative z-10 rotate-[-30deg]">
            <motion.div
              initial={{ opacity: 0, y: "-100px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 300,
                duration: 0.7,
                delay: 10.8,
              }}
            >
              <div className="translate-x-[-3vw]">
                <Signature width="20vw" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: "100px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 300,
                duration: 0.7,
                delay: 11,
              }}
            >
              <div className="absolute translate-y-[-3vw]">
                <Arrow width="20vw" />
              </div>
            </motion.div>
          </div>
          <div>
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
              className="relative z-50"
            >
              <Image
                src="/booster-logo.webp"
                alt="giveaway booster logo"
                width={600}
                height={600}
                className="h-auto w-[55vw] lg:w-[30vw] relative z-4"
              />
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: "30px" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 11.5 }}>
          <p className="text-center font-medium relative z-20 translate-y-[6vw] md:text-xl lg:text-[1.3vw] lg:leading-5 xl:leading-8 w-[95%] lg:w-[50vw] mx-auto lg:mr-0 lg:ml-auto backdrop-blur-lg opacity-70 px-6">
            Mỗi trang sách, một thế giới. Mỗi câu chữ, một tâm hồn. Mỗi giải thưởng, một triệu đồng. Mỗi kì thi, một đống giải! Tổng giải thưởng ít
            nhất hai triệu đồng cho mỗi kì Booster.
          </p>
          <div className="flex flex-row justify-center items-center w-[95%] lg:w-[50vw] mx-auto lg:mr-0 lg:ml-auto gap-1 lg:gap-4 mt-4 relative z-20 translate-y-[7vw]">
            <Link href="https://facebook.com/NaviRanobe" target="_blank" className={buttonVariants({ variant: "default" })}>
              <FacebookIcon className="w-4 h-4 mr-1" />
              HtL
            </Link>
            <Link href="https://facebook.com/TheMeoki" target="_blank" className={buttonVariants({ variant: "default" })}>
              <FacebookIcon className="w-4 h-4 mr-1" />
              Meoki
            </Link>
          </div>
        </motion.div>
        <div className="absolute mt-[70vw] sm:mt-[45vw] lg:mt-0 z-3 font-jaro font-normal w-full text-center overflow-hidden opacity-50 md:opacity-100 pointer-events-none select-none">
          <motion.div initial={{ opacity: 0, x: "100px" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 9.5 }}>
            <h1 className="text-[19vw] leading-[19vw] sm:text-[21vw] sm:leading-[17vw] text-background custom-stroke">LIGHT NOVEL</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: "-100px" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 9.6 }}>
            <h1 className="text-[19vw] leading-[20vw] sm:text-[24vw] sm:leading-[20vw] mt-[-4vw] sm:mt-[-2vw] text-background custom-stroke">
              GIVEAWAY
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: "100px" }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 9.7 }}>
            <h1 className="text-[19vw] leading-[20vw] sm:text-[26.3vw] sm:leading-[20vw] mt-[-4vw] sm:mt-[-2vw] text-background custom-stroke">
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
            className="w-full h-auto relative z-4 select-none pointer-events-none block mx-auto mt-[25vw] lg:mt-[-10vw]"
          />
        </div>
      </div>
    </div>
  );
}
