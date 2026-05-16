import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircleIcon, HomeIcon } from "lucide-react";
export const Promo = () => {
  return (
    <div className="border border-orange-300 dark:border-none dark:text-foreground shadow-xl shadow-orange-300/30 dark:shadow-[rgba(0,0,0,0.3)] dark:shadow-[0_0_10px] relative max-w-6xl rounded-3xl overflow-hidden mx-auto flex flex-col md:flex-row items-center gap-4 backdrop-blur-sm mt-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 -z-1 h-full w-full dark:bg-accent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [&>div]:absolute [&>div]:left-0 [&>div]:right-0 [&>div]:top-0 [&>div]:-z-10 [&>div]:m-auto [&>div]:h-[310px] [&>div]:w-[310px] [&>div]:rounded-full [&>div]:bg-fuchsia-400 [&>div]:opacity-20 [&>div]:blur-[100px]"></div>
      </div>
      <div className="flex-none p-4 text-center md:pl-12 md:text-left z-10 relative">
        <h2 className="text-2xl lg:text-3xl font-extrabold">Thích đọc truyện gốc tiếng Nhật?</h2>
        <p className="text-gray-500 font-medium dark:text-foreground text-lg lg:text-xl mt-2">
          Chúng tôi có một trình đọc và chia sẻ truyện gốc tiếng Nhật miễn phí.
        </p>
        <div className="flex gap-2 z-10 mt-8 justify-center md:justify-start">
          <Link href="https://lightnovel.vn" target="_blank">
            <Button
              size="lg"
              className="cursor-pointer px-4 font-bold lg:text-lg text-orange-50 bg-orange-700 dark:bg-primary dark:text-primary-foreground dark:shadow-sm dark:hover:bg-primary/90 hover:bg-orange-800 shadow-lg shadow-orange-800/40"
            >
              <HomeIcon className="w-4 h-4 mt-0.5 mr-2" />
              Trình Đọc Raw
            </Button>
          </Link>
          <Link href="https://facebook.com/TheMeoki" target="_blank">
            <Button size="lg" variant="outline" className="cursor-pointer px-4 lg:text-lg">
              <MessageCircleIcon className="w-4 h-4 mt-0.5 mr-2" />
              Nhắn Tin
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-auto flex justify-end z-10">
        <Image src="/uwu.png" alt="sneaker" width={536} height={391} className="h-auto" />
      </div>
    </div>
  );
};
