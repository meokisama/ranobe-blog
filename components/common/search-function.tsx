"use client";

import AuthorAvatar from "@/components/common/author-avatar";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { removeAccents } from "@/lib/remove-accents.mjs";
import type { Post } from "@/lib/types";

// posts.json entries are Posts augmented with pre-normalized (accent-stripped)
// fields that Fuse searches against — see scripts/export-posts.mjs.
type Item = Post;

const options = {
  keys: [
    { name: "normalizedMetadata.title", weight: 1.0 },
    { name: "normalizedMetadata.author", weight: 0.3 },
    { name: "normalizedMetadata.description", weight: 0.4 },
    { name: "normalizedMetadata.category", weight: 0.3 },
    { name: "normalizedDetail.jp", weight: 0.8 },
    { name: "normalizedDetail.vn", weight: 0.8 },
    { name: "normalizedDetail.romaji", weight: 0.8 },
    { name: "normalizedDetail.publisher", weight: 0.5 },
    { name: "normalizedDetail.author", weight: 0.5 },
    { name: "normalizedDetail.illustrator", weight: 0.5 },
    { name: "normalizedDetail.category", weight: 0.2 },
    { name: "normalizedDetail.safety", weight: 0.1 },
    { name: "normalizedContent", weight: 0.2 },
  ],
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

let fusePromise: Promise<Fuse<Item>> | null = null;

function getFuse() {
  if (!fusePromise) {
    fusePromise = fetch("/posts.json")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load posts.json: ${r.status}`);
        return r.json() as Promise<Item[]>;
      })
      .then((items) => new Fuse(items, options))
      .catch((err) => {
        fusePromise = null;
        throw err;
      });
  }
  return fusePromise;
}

export default function SearchFunction() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fuseRef = useRef<Fuse<Item> | null>(null);

  const runSearch = (q: string) => {
    const f = fuseRef.current;
    if (!f || q.trim() === "") {
      setResults([]);
      return;
    }
    setResults(f.search(removeAccents(q)).map((r) => r.item));
  };

  const debouncedSearchRef = useRef(debounce((q: string) => runSearch(q), 300));

  useEffect(() => {
    let cancelled = false;
    getFuse()
      .then((instance) => {
        if (cancelled) return;
        fuseRef.current = instance;
        setLoading(false);
        if (query.trim()) runSearch(query);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) {
          setLoading(false);
          setError("Không tải được dữ liệu tìm kiếm. Thử tải lại trang.");
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (q: string) => {
    setQuery(q);
    debouncedSearchRef.current(q);
  };

  return (
    <div className="mx-auto w-full px-2 sm:px-4 lg:px-10 h-[70vh] lg:h-[60vh] flex flex-col lg:flex-row gap-5 xl:gap-10">
      <div className="lg:w-2/5 flex flex-col gap-5">
        <div className="text-center">
          <h2 className="font-black text-3xl lg:text-4xl opacity-75">Tìm kiếm bài viết</h2>
          <p className="text-base leading-5 sm:text-lg sm:leading-5 mt-2 max-w-[90%] md:max-w-[80%] lg:max-w-lg mx-auto text-gray-500 dark:text-gray-400 hidden sm:block">
            Có thể tìm theo tiêu đề bài viết, tên tác phẩm (tiếng Nhật gốc, tiếng Việt chúng tôi tạm dịch hoặc theo romaji), tên tác giả, họa sĩ minh
            họa, nhà xuất bản gốc...
          </p>
          <p className="text-base leading-5 sm:text-lg sm:leading-5 mt-2 max-w-[90%] md:max-w-[80%] lg:max-w-lg mx-auto text-gray-500 dark:text-gray-400 sm:hidden">
            Có thể tìm theo tiêu đề bài viết, tên tác phẩm (Nhật, Việt, romaji), tên tác giả, họa sĩ, nhà xuất bản gốc...
          </p>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            onChange={(e) => handleSearch(e.target.value)}
            className="rounded-lg pl-8 lg:pl-9 py-4 xl:py-6 lg:text-lg dark:shadow-[0_3px_10px_rgba(0,0,0,0.3)] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
          <MagnifyingGlassIcon className="absolute left-2.5 top-0 bottom-0 my-auto w-4 h-4 lg:w-5 lg:h-5 text-gray-400 dark:text-gray-600" />
        </div>
        <div className="hidden lg:block grow">
          <div className="w-full h-[92%] rounded-xl overflow-hidden flex justify-center items-center">
            <Image
              src="https://res.cloudinary.com/dcdleqix0/image/upload/v1727412870/yuki_d9xcse.gif"
              height={175}
              width={175}
              alt={`A gif of Yuki!`}
              unoptimized={true}
              className="w-full h-full object-cover scale-105"
            />
          </div>
        </div>
      </div>
      <Separator orientation="vertical" className="hidden lg:block" />
      <div className="lg:w-3/5 h-full flex flex-col gap-3 sm:gap-4 overflow-scroll pb-4">
        {error ? (
          <div className="text-center text-lg lg:text-xl h-full flex flex-col gap-3 items-center justify-center text-red-500">
            <p>{error}</p>
          </div>
        ) : query === "" ? (
          <div className="text-center text-lg lg:text-xl h-full flex flex-col gap-3 items-center justify-center text-gray-500 dark:text-gray-400">
            <Image src="/200_chibi.png" alt="404 image" width={80} height={80} className="opacity-90 h-auto" />
            <p>Kết quả tìm kiếm tại đây...</p>
          </div>
        ) : loading ? (
          <div className="text-center text-lg lg:text-xl h-full flex flex-col gap-3 items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Đang tải dữ liệu tìm kiếm...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center text-lg lg:text-xl h-full flex flex-col gap-3 items-center justify-center text-gray-500 dark:text-gray-400">
            <Image src="/404_chibi.webp" alt="404 image" width={100} height={100} className="opacity-90 h-auto" />
            <p>Không tìm thấy bài viết phù hợp...</p>
          </div>
        ) : (
          results.map((result) => (
            <Link key={result.slug} href={`/blog/${result.slug}`} target="_blank">
              <div className="flex flex-row gap-4 items-center justify-center shadow-md dark:shadow-[0_3px_10px_rgba(0,0,0,0.3)] dark:bg-accent ml-2 mr-2 sm:mr-4 p-4 rounded-xl border dark:border-none">
                <div>
                  <div className="w-27.5 h-27.5 sm:w-37.5 sm:h-37.5 lg:w-62.5 lg:h-42.5 rounded-lg overflow-hidden">
                    <Image
                      src={result.metadata.thumbnail}
                      alt="search result thumbnail"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl leading-5 lg:leading-6 lg:text-2xl font-bold mb-1 sm:mb-2 lg:mb-4 pb-0.5 line-clamp-2">
                    {result.metadata.title}
                  </h3>
                  <div className="flex flex-row gap-2 justify-start items-center mb-1 sm:mb-2">
                    <AuthorAvatar name={result.metadata.author} className="w-7.5 lg:w-10 h-auto" />
                    <div>
                      <p className="text-base sm:text-lg leading-5 lg:text-xl lg:leading-6 font-semibold">{result.metadata.author}</p>
                      <p className="-mt-1">{format(new Date(result.metadata.publishDate), "dd MMMM, yyyy", { locale: vi })}</p>
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
