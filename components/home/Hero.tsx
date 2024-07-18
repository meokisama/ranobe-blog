"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import style from "./home.module.scss";

export default function Hero() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <div
        className={`w-full min-h-screen absolute bg-[length:3vw_3vw] lg:bg-[length:1.5vw_1.5vw] -z-10 ${style.caro}`}
      />
      <div className="w-full absolute bottom-0 z-50 select-none pointer-events-none">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 6.5 }}
        >
          <Image
            src="/imouza.png"
            alt="imouza banner"
            width={1500}
            height={1500}
            className="w-[90vw] sm:w-[500px] lg:w-[40vw] h-auto block my-0 mx-auto"
          />
        </motion.div>
      </div>
      <div>
        <div className="mt-20 mr-10 -rotate-12 text-[#e7b088b8]">
          <motion.h1
            initial={{ opacity: 0, y: "-50px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 6.5 }}
            className="font-poppins tracking-tight text-center my-0 text-[15vw] leading-none"
          >
            THEMEOKI
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: "50px" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 6.5 }}
            className="font-poppins tracking-tight text-center my-0 text-[14.5vw] leading-none"
          >
            NAVIRANOBE
          </motion.h1>
        </div>
      </div>
    </div>
  );
}
