"use client";
import useIsMobile from "@/hooks/useIsMobile";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const isMobile = useIsMobile();
  const [hydrated, setHydrated] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    setHydrated(true);
    document.body.style.position = "fixed";
    const timeoutId = setTimeout(() => {
      document.body.style.position = "";
      setShouldUnmount(true);
    }, 15000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!hydrated) {
    return (
      <div className="h-screen w-screen bg-white fixed overflow-hidden"></div>
    );
  }

  return shouldUnmount ? null : (
    <div className="h-screen w-screen select-none pointer-events-none fixed overflow-hidden z-[5000]">
      <div className="fixed h-full w-full flex flex-col justify-center items-start z-20">
        {/* Hana 01 */}
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: 0, rotate: 0 }}
          animate={{ x: "100vw", y: "-300px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 4.5, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_01.png"
            alt="sakura flower petal"
            width={300}
            height={300}
            className="w-[150px] lg:w-[300px] h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: "100px", rotate: 0 }}
          animate={{ x: "100vw", y: "100px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 5.5, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_01.png"
            alt="sakura flower petal"
            width={150}
            height={150}
            className="w-[75px] lg:w-[150px] h-auto"
          />
        </motion.div>

        {/* Hana 02 */}
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: "100px", rotate: 0 }}
          animate={{ x: "100vw", y: "0", rotate: 180 }}
          transition={{ duration: 2.5, delay: 5, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_02.png"
            alt="sakura flower petal"
            width={100}
            height={100}
            className="w-[50px] lg:w-[100px] h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: "400px", rotate: 0 }}
          animate={{ x: "100vw", y: "100px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 5, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_02.png"
            alt="sakura flower petal"
            width={180}
            height={180}
            className="w-[90px] lg:w-[180px] h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: 0, rotate: 0 }}
          animate={{ x: "100vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 5.2, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_02.png"
            alt="sakura flower petal"
            width={200}
            height={200}
            className="w-[100px] lg:w-[200px] h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: 0, rotate: 0 }}
          animate={{ x: "100vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 4.6, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_02.png"
            alt="sakura flower petal"
            width={100}
            height={100}
            className="w-[50px] lg:w-[100px] h-auto"
          />
        </motion.div>

        {/* Hana 03 */}
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: 0, rotate: 30 }}
          animate={{ x: "100vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 4.8, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_03.png"
            alt="sakura flower petal"
            width={230}
            height={230}
            className="w-[110px] lg:w-[230px] h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: 0, rotate: 0 }}
          animate={{ x: "100vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 5.4, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_03.png"
            alt="sakura flower petal"
            width={220}
            height={220}
            className="w-[100px] lg:w-[220px] h-auto"
          />
        </motion.div>

        {/* Hana 04 */}
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: "400px", rotate: 0 }}
          animate={{ x: "100vw", y: "100px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 4.7, ease: "easeIn" }}
          className="fixed"
        >
          <Image
            src="/hana_04.png"
            alt="sakura flower petal"
            width={180}
            height={180}
            className="w-[90px] lg:w-[180px] h-auto"
          />
        </motion.div>
        <motion.div
          initial={{ x: isMobile ? "-50vw" : "-30vw", y: 0, rotate: 0 }}
          animate={{ x: "100vw", y: "-100px", rotate: 180 }}
          transition={{ duration: 2.5, delay: 5, ease: "easeIn" }}
        >
          <Image
            src="/hana_04.png"
            alt="sakura flower petal"
            width={200}
            height={200}
            className="w-[100px] lg:w-[200px] h-auto"
          />
        </motion.div>
      </div>
      <motion.div
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 4.5 }}
        className="font-playfair fixed flex flex-col justify-center items-center h-full w-full lg:text-3xl gap-2 lg:gap-4 text-center px-4 text-slate-800 z-10"
      >
        <motion.p
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 5, delay: 1 }}
        >
          Light Novel cất giấu nhiều điều{" "}
          <strong className="text-red-500">hơn</strong> bạn nghĩ...
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 5, delay: 2 }}
        >
          Bạn thực sự đã <strong className="text-blue-500">hiểu hết</strong>{" "}
          những gì tác giả muốn truyền tải qua những trang sách?
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 7 }}
        className="w-full h-full bg-white"
      ></motion.div>
    </div>
  );
}
