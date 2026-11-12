"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** A hairline along the top of the viewport that fills as the article is read. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" />;
}

/** The cover: unveils with a clip wipe, then drifts slower than the page. */
export function PostCover({ src, alt, jp }: { src: string; alt: string; jp?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface md:aspect-[21/10]"
    >
      <motion.div style={{ y }} className="absolute inset-[-12%_0]">
        <motion.div
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image src={src} alt={alt} fill priority sizes="100vw" quality={90} className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
      {jp && (
        <p
          lang="ja"
          className="vertical-rl absolute right-4 top-4 max-h-[88%] overflow-hidden font-jp text-xl font-bold leading-snug tracking-[0.22em] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)] md:right-8 md:top-8 md:text-4xl"
        >
          {jp}
        </p>
      )}
    </motion.div>
  );
}
