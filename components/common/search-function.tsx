"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useRef, useState } from "react";
import debounce from "lodash/debounce";
import Fuse from "fuse.js";
import data from "@/data/posts.json";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";

interface Metadata {
  title: string;
  author: string;
  thumbnail: string;
  publishDate: string;
  description: string;
  category: string;
}

interface Detail {
  jp: string;
  vn: string;
  romaji: string;
  publisher: string;
  author: string;
  illustrator: string;
  release: string;
  category: string;
  volume: string;
  en_trans: string;
  en_trans_url: string;
  vi_trans: string;
  vi_trans_url: string;
  safety: string;
}

interface Item {
  slug: string;
  metadata: Metadata;
  detail?: Detail;
}

// Manually replace to not affect to dakuten in Japanese like ど...
const removeAccents = (str: string) => {
  return str
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, "A")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, "E")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[ÌÍỊỈĨ]/g, "I")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, "O")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, "U")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/[ỲÝỴỶỸ]/g, "Y")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const normalizedData = data.map((item) => {
  return {
    ...item,
    normalizedMetadata: {
      title: removeAccents(item.metadata.title),
      author: removeAccents(item.metadata.author),
      description: removeAccents(item.metadata.description),
      category: removeAccents(item.metadata.category),
    },
    normalizedDetail: item.detail
      ? {
          ...item.detail,
          jp: removeAccents(item.detail.jp),
          vn: removeAccents(item.detail.vn),
          romaji: removeAccents(item.detail.romaji),
          publisher: removeAccents(item.detail.publisher),
          author: removeAccents(item.detail.author),
          illustrator: removeAccents(item.detail.illustrator),
          category: removeAccents(item.detail.category),
          safety: removeAccents(item.detail.safety),
        }
      : null,
  };
});

const options = {
  keys: [
    { name: "normalizedMetadata.title", weight: 1.0 },
    { name: "normalizedMetadata.author", weight: 0.3 },
    { name: "normalizedMetadata.description", weight: 0.3 },
    { name: "normalizedMetadata.category", weight: 0.3 },
    { name: "normalizedDetail.jp", weight: 0.8 },
    { name: "normalizedDetail.vn", weight: 0.8 },
    { name: "normalizedDetail.romaji", weight: 0.8 },
    { name: "normalizedDetail.publisher", weight: 0.5 },
    { name: "normalizedDetail.author", weight: 0.5 },
    { name: "normalizedDetail.illustrator", weight: 0.5 },
    { name: "normalizedDetail.category", weight: 0.2 },
    { name: "normalizedDetail.safety", weight: 0.1 },
  ],
  includeScore: true,
  threshold: 0.4,
};

const fuse = new Fuse(normalizedData, options);

export default function SearchFunction() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Item[]>([]);

  const debouncedSearchRef = useRef(
    debounce((query: string) => {
      if (query.trim() === "") {
        setResults([]);
      } else {
        const normalizedQuery = removeAccents(query);
        const searchResult = fuse
          .search(normalizedQuery)
          .map((result) => result.item);
        setResults(searchResult);
      }
    }, 500)
  );

  const handleSearch = (query: string) => {
    setQuery(query);
    debouncedSearchRef.current(query);
  };

  return (
    <div className="mx-auto w-full p-2 pb-0 sm:p-4 sm:pb-0 lg:p-10 lg:pb-0 h-[70vh] lg:h-[60vh] flex flex-col lg:flex-row gap-5 xl:gap-10">
      <div className="lg:w-2/5">
        <div className="text-center mb-5 xl:mb-8">
          <h2 className="font-black text-3xl lg:text-4xl opacity-75">
            Tìm kiếm bài viết
          </h2>
          <p className="text-base leading-5 sm:text-lg sm:leading-5 mt-2 max-w-[90%] md:max-w-[80%] lg:max-w-[32rem] mx-auto text-gray-500 dark:text-gray-400 hidden sm:block">
            Có thể tìm theo tiêu đề bài viết, tên tác phẩm (tiếng Nhật gốc,
            tiếng Việt chúng tôi tạm dịch hoặc theo romaji), tên tác giả, họa sĩ
            minh họa, nhà xuất bản gốc...
          </p>
          <p className="text-base leading-5 sm:text-lg sm:leading-5 mt-2 max-w-[90%] md:max-w-[80%] lg:max-w-[32rem] mx-auto text-gray-500 dark:text-gray-400 sm:hidden">
            Có thể tìm theo tiêu đề bài viết, tên tác phẩm (Nhật, Việt, romaji),
            tên tác giả, họa sĩ, nhà xuất bản gốc...
          </p>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-lg pl-8 lg:pl-9 py-4 lg:py-6 lg:text-lg dark:shadow-[0_3px_10px_rgba(0,0,0,0.6)] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
          <MagnifyingGlassIcon className="absolute left-2.5 top-0 bottom-0 my-auto w-4 h-4 lg:w-5 lg:h-5 text-gray-400 dark:text-gray-600" />
        </div>
        <div className="hidden lg:block">
          <div className="w-full h-[130px] xl:h-[200px] 2xl:h-[250px] rounded-xl overflow-hidden flex justify-center items-center mt-5 xl:mt-9">
            <Image
              src="https://res.cloudinary.com/dcdleqix0/image/upload/v1727412870/yuki_d9xcse.gif"
              height={175}
              width={175}
              alt={`A gif of Yuki!`}
              unoptimized={true}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="lg:w-3/5 h-full flex flex-col gap-3 sm:gap-4 overflow-scroll pb-4">
        {query === "" ? (
          <div className="text-center text-lg lg:text-xl h-full flex flex-col gap-3 items-center justify-center text-gray-500 dark:text-gray-400">
            <Image
              src="/200_chibi.png"
              alt="404 image"
              width={80}
              height={80}
              className="opacity-90 h-auto"
            />
            <p>Kết quả tìm kiếm tại đây...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center text-lg lg:text-xl h-full flex flex-col gap-3 items-center justify-center text-gray-500 dark:text-gray-400">
            <Image
              src="/404_chibi.webp"
              alt="404 image"
              width={100}
              height={100}
              className="opacity-90 h-auto"
            />
            <p>Không tìm thấy bài viết phù hợp...</p>
          </div>
        ) : (
          results.map((result, index) => (
            <Link key={index} href={`/blog/${result.slug}`} target="_blank">
              <div className="flex flex-row gap-4 items-center justify-center shadow-md mr-2 sm:mr-4 p-4 rounded-xl border dark:border-none">
                <div>
                  <div className="w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] lg:w-[250px] lg:h-[170px] rounded-lg overflow-hidden">
                    <Image
                      src={`/posts/${result.metadata.thumbnail}`}
                      alt="search result thumbnail"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl leading-5 lg:leading-6 lg:text-2xl font-bold mb-1 sm:mb-2 lg:mb-4 pb-[2px] line-clamp-2">
                    {result.metadata.title}
                  </h3>
                  <div className="flex flex-row gap-2 justify-start items-center mb-1 sm:mb-2">
                    <Avatar className="w-[30px] lg:w-[40px] h-auto">
                      <AvatarImage
                        src={
                          result.metadata.author === "NaviRanobe"
                            ? "/naviranobe.jpg"
                            : "/themeoki.jpg"
                        }
                      />
                      <AvatarFallback>
                        <span className="font-bold">CN</span>
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base sm:text-lg leading-5 lg:text-xl lg:leading-6 font-semibold">
                        {result.metadata.author}
                      </p>
                      <p className="-mt-1">
                        {format(
                          new Date(result.metadata.publishDate),
                          "dd MMMM, yyyy",
                          { locale: vi }
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg leading-5 lg:text-xl lg:leading-6 line-clamp-1 sm:line-clamp-2 mt-1 sm:mt-2">
                    {result.metadata.description}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
