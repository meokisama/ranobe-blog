"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Splits text into words that rise out of a clipped line, one after another. */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  onView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate when scrolled into view (default) or immediately on mount. */
  onView?: boolean;
}) {
  const words = text.split(" ");
  const visible = { y: "0%", rotate: 0 };
  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "-mb-[0.18em] -mt-[0.22em] inline-block overflow-hidden pb-[0.18em] pt-[0.22em] align-bottom",
            i < words.length - 1 && "mr-[0.24em]",
          )}
        >
          <motion.span
            className="inline-block origin-bottom-left will-change-transform"
            initial={{ y: "115%", rotate: 4 }}
            {...(onView ? { whileInView: visible, viewport: { once: true, margin: "0px 0px -8% 0px" } } : { animate: visible })}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
