"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUpIcon } from "@radix-ui/react-icons";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const handleScroll = () => setIsVisible(window.scrollY > 400);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Button
      onClick={scrollToTop}
      style={{
        display: isVisible ? "block" : "none",
      }}
      className="fixed w-10 h-9 z-[4000] bottom-2 right-4 p-0 shadow-lg"
      variant="outline"
    >
      <ChevronUpIcon className="w-5 h-5 block mx-auto" />
    </Button>
  );
}

export default ScrollToTop;
