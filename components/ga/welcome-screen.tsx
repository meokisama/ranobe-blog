"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WelcomeScreen() {
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    document.body.style.position = "fixed";
    document.body.style.width = "100vw";
    const timeoutId = setTimeout(() => {
      document.body.style.position = "";
      document.body.style.width = "";
      setShouldUnmount(true);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return shouldUnmount ? null : (
    <div className="h-screen w-screen select-none pointer-events-none fixed overflow-hidden z-[5000]">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 4 }}
        className="fixed z-10 w-screen"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="w-full h-screen flex justify-center items-center"
        >
          <Image
            src="/splash_papa.jpg"
            alt="welcome back papa"
            width={800}
            height={800}
            className="h-auto w-screen md:h-screen md:w-auto translate-x-6 md:translate-x-0"
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 8 }}
        className="fixed z-10 w-full h-full flex justify-center items-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 6 }}
          className="text-white font-playfair lg:text-xl xl:text-2xl"
        >
          Light Novel Giveaway Booster
        </motion.div>
      </motion.div>
      <div className="flex flex-col h-full">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{ duration: 0.7, delay: 9, ease: "easeOut" }}
          className="h-1/2 bg-black"
        ></motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "100%" }}
          transition={{ duration: 0.7, delay: 9, ease: "easeOut" }}
          className="h-1/2 bg-black"
        ></motion.div>
      </div>
    </div>
  );
}
