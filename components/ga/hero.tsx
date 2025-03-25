"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Signature, Arrow } from "./signature";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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
        <div className="absolute z-2 inset-0 bg-[url(/grid.svg)] bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] translate-y-[-2px] dark:invert opacity-70 md:opacity-100"></div>
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
        <motion.div
          initial={{ opacity: 0, y: "30px" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 11.5 }}
        >
          <p className="text-center font-medium relative z-20 translate-y-[6vw] md:text-xl lg:text-[1.3vw] lg:leading-5 xl:leading-8 w-[95%] lg:w-[50vw] mx-auto lg:mr-0 lg:ml-auto backdrop-blur-lg opacity-70 px-6">
            Mỗi trang sách, một thế giới. Mỗi câu chữ, một tâm hồn. Mỗi giải
            thưởng, một triệu đồng. Mỗi kì thi, một đống giải! Tổng giải thưởng
            ít nhất hai triệu đồng cho mỗi kì Booster.
          </p>
          <div className="flex flex-row justify-center items-center w-[95%] lg:w-[50vw] mx-auto lg:mr-0 lg:ml-auto gap-1 lg:gap-4 mt-4 relative z-20 translate-y-[7vw]">
            <Link
              href="https://facebook.com/NaviRanobe"
              target="_blank"
              className={buttonVariants({ variant: "default" })}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
              HtL
            </Link>
            <Link
              href="https://facebook.com/TheMeoki"
              target="_blank"
              className={buttonVariants({ variant: "default" })}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Meoki
            </Link>
          </div>
        </motion.div>
        <div className="absolute mt-[70vw] sm:mt-[45vw] lg:mt-0 z-3 font-jaro font-normal w-full text-center overflow-hidden opacity-50 md:opacity-100 pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, x: "100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 9.5 }}
          >
            <h1 className="text-[19vw] leading-[19vw] sm:text-[21vw] sm:leading-[17vw] text-[var(--background)] custom-stroke">
              LIGHT NOVEL
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "-100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 9.6 }}
          >
            <h1 className="text-[19vw] leading-[20vw] sm:text-[24vw] sm:leading-[20vw] mt-[-4vw] sm:mt-[-2vw] text-[var(--background)] custom-stroke">
              GIVEAWAY
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "100px" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 9.7 }}
          >
            <h1 className="text-[19vw] leading-[20vw] sm:text-[26.3vw] sm:leading-[20vw] mt-[-4vw] sm:mt-[-2vw] text-[var(--background)] custom-stroke">
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
