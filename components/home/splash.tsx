"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { SPLASH_SEEN_KEY, markSplashRevealed } from "@/lib/splash";

const playfair = Playfair_Display({ subsets: ["vietnamese"], display: "swap" });

// The original splash screen, restored as it was: two lines fade in on white,
// a flock of sakura petals blows across, and the white fades to the page.
// Only the bookkeeping around it changed (see the effect below).
export default function SplashScreen() {
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const seen = useRef<boolean | null>(null);

  useEffect(() => {
    // Decide once. In development React runs effects twice, and the second
    // run must not read the flag the first one just wrote.
    if (seen.current === null) {
      seen.current = sessionStorage.getItem(SPLASH_SEEN_KEY) === "1";
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    }
    if (seen.current) {
      markSplashRevealed();
      const id = setTimeout(() => setShouldUnmount(true), 0);
      return () => clearTimeout(id);
    }

    document.body.style.position = "fixed";
    document.body.style.width = "100vw";
    // Let the hero's 3D scene start just before the white begins to fade, so
    // it isn't rendering behind the splash while the petals animate.
    const revealId = setTimeout(markSplashRevealed, 6400);
    const timeoutId = setTimeout(() => {
      document.body.style.position = "";
      document.body.style.width = "";
      setShouldUnmount(true);
    }, 9000);

    return () => {
      clearTimeout(revealId);
      clearTimeout(timeoutId);
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  return shouldUnmount ? null : (
    <div className="splash h-screen w-full select-none pointer-events-none fixed inset-0 overflow-hidden z-5000">
      {/* Hide the splash before first paint for visitors who already saw it. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("${SPLASH_SEEN_KEY}")==="1")document.documentElement.dataset.splash="seen"}catch(e){}`,
        }}
      />
      <div className="fixed inset-0 h-full w-full flex flex-col justify-center items-start translate-x-[-50vw] lg:translate-x-[-35vw] xl:translate-x-[-20vw] z-6000">
        {/* Hana 01 */}
        <motion.div
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: "150vw", y: "-300px", rotate: 180 }}
          transition={{ duration: 2, delay: 5, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_01.png" alt="sakura flower petal" width={300} height={300} className="w-[150px] lg:w-[220px] xl:w-[300px] h-auto" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: "100px", rotate: 0 }}
          animate={{ x: "150vw", y: "100px", rotate: 180 }}
          transition={{ duration: 2, delay: 6.1, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_01.png" alt="sakura flower petal" width={150} height={150} className="w-18.75 lg:w-27.5 xl:w-37.5 h-auto" />
        </motion.div>

        {/* Hana 02 */}
        <motion.div
          initial={{ x: 0, y: "100px", rotate: 0 }}
          animate={{ x: "150vw", y: "0", rotate: 180 }}
          transition={{ duration: 2, delay: 5.5, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_02.png" alt="sakura flower petal" width={100} height={100} className="w-12.5 lg:w-18.75 xl:w-25 h-auto" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: "400px", rotate: 0 }}
          animate={{ x: "150vw", y: "100px", rotate: 180 }}
          transition={{ duration: 2, delay: 5.5, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_02.png" alt="sakura flower petal" width={180} height={180} className="w-22.5 lg:w-33.75 xl:w-45 h-auto" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: "150vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2, delay: 5.7, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_02.png" alt="sakura flower petal" width={200} height={200} className="w-25 lg:w-37.5 xl:w-50 h-auto" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: "150vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2, delay: 5.1, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_02.png" alt="sakura flower petal" width={100} height={100} className="w-12.5 lg:w-18.75 xl:w-25 h-auto" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: "150vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2, delay: 6.3, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_02.png" alt="sakura flower petal" width={100} height={100} className="w-12.5 lg:w-18.75 xl:w-25 h-auto" />
        </motion.div>

        {/* Hana 03 */}
        <motion.div
          initial={{ x: 0, y: 0, rotate: 30 }}
          animate={{ x: "150vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2, delay: 5.3, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_03.png" alt="sakura flower petal" width={230} height={230} className="w-27.5 lg:w-45 xl:w-57.5 h-auto" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: "150vw", y: "-200px", rotate: 180 }}
          transition={{ duration: 2, delay: 6, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_03.png" alt="sakura flower petal" width={220} height={220} className="w-25 lg:w-40 xl:w-55 h-auto" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: "100px", rotate: 0 }}
          animate={{ x: "150vw", y: "0", rotate: 180 }}
          transition={{ duration: 2, delay: 6.5, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_03.png" alt="sakura flower petal" width={120} height={120} className="w-15 lg:w-22.5 xl:w-30 h-auto" />
        </motion.div>

        {/* Hana 04 */}
        <motion.div
          initial={{ x: 0, y: "400px", rotate: 0 }}
          animate={{ x: "150vw", y: "100px", rotate: 180 }}
          transition={{ duration: 2, delay: 5.2, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_04.png" alt="sakura flower petal" width={180} height={180} className="w-22.5 lg:w-33.75 xl:w-45 h-auto" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={{ x: "150vw", y: "-100px", rotate: 180 }}
          transition={{ duration: 2, delay: 5.7, ease: "easeIn" }}
          className="fixed"
        >
          <Image src="/hana_04.png" alt="sakura flower petal" width={200} height={200} className="w-25 lg:w-37.5 xl:w-50 h-auto" />
        </motion.div>
      </div>
      <motion.div
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 5 }}
        className={`${playfair.className} fixed inset-0 flex flex-col justify-center items-center h-screen w-screen lg:text-xl xl:text-3xl gap-2 xl:gap-4 text-center px-4 text-slate-800 z-5001`}
      >
        <motion.p
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 5, delay: 1 }}
          style={{
            willChange: "transform",
          }}
        >
          Light Novel cất giấu nhiều điều <strong className="text-red-500">hơn</strong> bạn nghĩ...
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 5, delay: 2.5 }}
          style={{
            willChange: "transform",
          }}
        >
          Bạn thực sự đã <strong className="text-blue-500">hiểu hết</strong> những gì tác giả muốn truyền tải qua những trang sách?
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
