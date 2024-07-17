"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="w-full min-h-screen overflow-hidden">
      <div className="w-[500px] h-[750px] float-right mr-[10%] overflow-hidden rounded-b-xl">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: 7 }}
          className="w-full h-full"
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
    </div>
  );
}
