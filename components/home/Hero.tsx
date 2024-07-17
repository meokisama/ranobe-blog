"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 7 }}
      >
        <Image
          src="/sample.jpg"
          alt="Ranobe hero banner image"
          width={1825}
          height={926}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
