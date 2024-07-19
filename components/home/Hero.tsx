"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import style from "./home.module.scss";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

export default function Hero() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <div
        className={`w-full h-full absolute bg-[length:3vw_3vw] lg:bg-[length:1.5vw_1.5vw] -z-10 ${style.caro}`}
      />
      <div>
        <div className="mt-12 mr-10 -rotate-12 text-[#e7b088b8] dark:text-[#3b71ab]">
          <motion.h1
            initial={{ opacity: 0, y: "-100px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 7 }}
            className="font-poppins tracking-tight text-center my-0 text-[15vw] leading-none"
          >
            THEMEOKI
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: "100px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 7 }}
            className="font-poppins tracking-tight text-center my-0 text-[14.5vw] leading-none"
          >
            NAVIRANOBE
          </motion.h1>
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row lg:gap-[35vw]">
          <div className="w-1/2"></div>
          <div className="w-full px-10 lg:w-1/2 lg:pr-[4vw] font-grotesque lg:rotate-6 lg:-translate-y-[20px]">
            <motion.div
              initial={{ opacity: 0, y: "-50px" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 7 }}
            >
              <p className="lg:text-[1.3vw] text-justify leading-tight mt-16 md:mt-32 lg:mt-0">
                Có bao giờ bạn tự nghĩ những cuốn light novel ngoài kia có thể
                ẩn chứa những bí mật kín đáo hơn những gì mắt thấy? Đã bao giờ
                bạn tự hỏi liệu mình đã thật sự thấu hiểu hết những thông điệp
                tinh tế mà tác giả khéo léo ẩn giấu giữa những dòng chữ? Có lẽ,
                light novel không chỉ là những câu chuyện bình dị, mà còn là
                những bí mật chờ đợi bạn khám phá. Và đây là một blog sẽ đi cùng
                bạn trong hành trình đó
              </p>
              <div className="flex flex-row justify-center lg:float-right gap-1 lg:gap-4 mt-4">
                <Link
                  href="https://facebook.com/NaviRanobe"
                  target="_blank"
                  className={buttonVariants({ variant: "default" })}
                >
                  <TwitterLogoIcon className="mr-1" /> HtL
                </Link>
                <Link
                  href="https://facebook.com/TheMeoki"
                  target="_blank"
                  className={buttonVariants({ variant: "default" })}
                >
                  <TwitterLogoIcon className="mr-1" /> Meoki
                </Link>
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
            className="w-[70vw] sm:w-[500px] lg:w-[40vw] h-auto block my-0 mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
}
