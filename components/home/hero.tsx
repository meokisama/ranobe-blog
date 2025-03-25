"use client";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AUTHORS } from "@/constants";

export default function Hero() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden backdrop-blur-lg">
      <div className="w-full h-full absolute bg-[length:4vw_4vw] lg:bg-[length:1.5vw_1.5vw] -z-10 custom-caro opacity-40 lg:opacity-80 dark:opacity-10" />
      <div>
        <div className="mr-10 -rotate-12 select-none pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: "-100px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 7 }}
            className="-mb-4 md:-mb-12 lg:-mb-12 xl:-mb-20"
          >
            <h1 className="font-jaro font-normal tracking-tight text-center my-0 text-[19vw] lg:text-[20vw] leading-none dark:bg-[linear-gradient(45deg,_#a875ec_20%,_#ff6b7c_100%)] dark:[filter:drop-shadow(0px_3px_8px_rgba(0,0,0,_0.5))] dark:[text-outline:1px_solid_black] dark:bg-clip-text dark:text-transparent text-white [filter:drop-shadow(0px_3px_8px_rgba(255,139,39,0.3))]">
              THEMEOKI
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: "100px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 7 }}
            className="-mb-4 md:-mb-12 lg:-mb-12 xl:-mb-20"
          >
            <h1 className="font-jaro font-normal tracking-tight text-center my-0 text-[19vw] lg:text-[20vw] leading-none dark:bg-[linear-gradient(45deg,_#a875ec_20%,_#ff6b7c_100%)] dark:[filter:drop-shadow(0px_3px_8px_rgba(0,0,0,_0.5))] dark:[text-outline:1px_solid_black] dark:bg-clip-text dark:text-transparent text-white [filter:drop-shadow(0px_3px_8px_rgba(255,139,39,0.3))]">
              NAVIRANOBE
            </h1>
          </motion.div>
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row lg:gap-[35vw] -mt-16 lg:-mt-4">
          <div className="w-1/2"></div>
          <div className="w-full px-10 lg:w-1/2 lg:pr-[4vw] font-grotesque lg:rotate-6 lg:-translate-y-[20px]">
            <motion.div
              initial={{ opacity: 0, y: "-100px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 300,
                delay: 8,
              }}
            >
              <Image
                src="/makeine.png"
                alt="makeine chibi"
                width={150}
                height={150}
                className="h-auto w-[100px] sm:w-[150px] scale-x-[-1] lg:hidden block ml-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: "-50px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 300,
                delay: 8,
              }}
              className="mt-10"
            >
              <p className="lg:text-[1.3vw] text-justify leading-tight">
                Có bao giờ bạn tự nghĩ những cuốn light novel ngoài kia có thể
                ẩn chứa những bí mật kín đáo hơn những gì mắt thấy? Đã bao giờ
                bạn tự hỏi liệu mình đã thật sự thấu hiểu hết những thông điệp
                tinh tế mà tác giả khéo léo ẩn giấu giữa những dòng chữ? Có lẽ,
                light novel không chỉ là những câu chuyện bình dị, mà còn là
                những bí mật chờ đợi bạn khám phá. Và đây là một blog sẽ đi cùng
                bạn trong hành trình đó
              </p>
              <div className="flex flex-row justify-center lg:float-right gap-1 lg:gap-4 mt-4">
                {AUTHORS.map(({ facebook, nickname }) => (
                  <Link
                    href={facebook}
                    target="_blank"
                    className={buttonVariants({ variant: "default" })}
                    key={facebook}
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
                    {nickname}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="w-full lg:absolute bottom-0 z-50 select-none pointer-events-none">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 7 }}
        >
          <Image
            src="/imouza.png"
            alt="imouza banner"
            width={1500}
            height={1500}
            priority
            className="w-[70vw] sm:w-[500px] lg:w-[40vw] h-auto block my-0 mx-auto"
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: "-100px" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          damping: 10,
          mass: 0.75,
          stiffness: 300,
          delay: 8.2,
        }}
        className="absolute hidden lg:block top-[10%] left-5 select-none pointer-events-none"
      >
        <Image
          src="/makeine.png"
          alt="makeine chibi"
          width={180}
          height={180}
          className="h-auto"
        />
      </motion.div>
    </div>
  );
}
