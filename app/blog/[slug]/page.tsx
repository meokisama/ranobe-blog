import fs from "node:fs";
import path from "node:path";
import React from "react";
import dynamic from "next/dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import GiscusComments from "@/components/blog/giscus";
import IconBar from "@/components/common/icon-bar";
import { CATEGORIES, AUTHORS } from "@/constants";
import { Promo } from "@/components/home/promo";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost({ slug });
  return {
    title: post.metadata.title + " - Ranobe",
    description: post.metadata.description,
    authors: post.metadata.author,
    metadataBase: new URL("https://ranobe.vn"),
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      images: `/posts/${post.metadata.thumbnail}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: `/posts/${post.metadata.thumbnail}`,
    },
  };
}

async function getPost({ slug }: { slug: string }) {
  try {
    const mdxPath = path.join("posts", `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file for slug ${slug} does not exist`);
    }

    const { metadata } = await import(`@/posts/${slug}.mdx`);

    return {
      slug,
      metadata,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error(`Unable to fetch the post for slug: ${slug}`);
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("posts"));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return params;
}

const categoriesMap: { [key: string]: string } = CATEGORIES.reduce(
  (map, item) => {
    map[item.metadataCategory] = item.category;
    return map;
  },
  {} as { [key: string]: string }
);

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const post = await getPost({ slug });
  const MDXContent = dynamic(() => import(`@/posts/${slug}.mdx`));

  const formattedDate = format(
    new Date(post.metadata.publishDate),
    "dd MMMM, yyyy",
    { locale: vi }
  );

  return (
    <div className="relative">
      <IconBar />
      <div className="absolute z-2 select-none pointer-events-none font-jaro w-full text-center overflow-hidden backdrop-blur-sm">
        <h1 className="text-[50vw] leading-[40vw] sm:text-[21vw] sm:leading-[17vw] text-[var(--background)] custom-stroke">
          NAVIRANOBE
        </h1>
        <h1 className="text-[50vw] leading-[40vw] sm:text-[26.3vw] sm:leading-[20vw] sm:mt-[-2vw] text-[var(--background)] custom-stroke">
          THEMEOKI
        </h1>
      </div>
      <Image
        src="/sneaker.webp"
        alt="background image"
        width={1308}
        height={1000}
        className="fixed w-full h-auto select-none pointer-events-none z-1 dark:invert dark:hidden"
      />
      <Image
        src="/beams.jpg"
        alt="background image"
        width={1308}
        height={1000}
        className="fixed w-full h-full select-none pointer-events-none z-1 opacity-50 dark:invert dark:hidden"
      />
      <div className="max-w-5xl block mx-auto relative z-10">
        <Image
          src="/mamasuki.png"
          alt="blog post mamasuki"
          width={500}
          height={591}
          priority
          className="w-[300px] md:w-[400px] lg:w-[500px] h-auto relative z-10 translate-y-[2.6rem] md:translate-y-[3.5rem] lg:translate-y-[4.4rem] block mx-auto md:mr-0 select-none pointer-events-none"
        />
        <div className="p-6 lg:py-12 lg:px-24 bg-[#fbfbfb] dark:bg-[var(--accent)] rounded-2xl shadow-[0_3px_8px_rgba(0,0,0,0.24)] dark:shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          <Link
            href="/blog"
            className="flex flex-row justify-end md:justify-start relative z-50"
          >
            <Button className="text-lg mb-8 flex flex-row items-center gap-1 cursor-pointer">
              <ArrowLeftIcon className="mt-1" />
              <p>Tất cả bài viết</p>
            </Button>
          </Link>
          <Separator className="mb-4" />
          <article className="mx-auto min-w-full">
            <div className="pb-5">
              <h1 className="text-5xl sm:text-6xl font-black capitalize leading-12">
                {post.metadata.title}
              </h1>
            </div>
            <div className="pb-8 italic">
              <p className="font-semibold text-lg">
                Đăng tải{" "}
                <span className="text-red-500 pr-1">{formattedDate}</span>
                {" | "}
                {post.metadata.category}
              </p>
            </div>
            <Separator className="mb-8" />
            <div className="flex flex-row gap-2 justify-start items-center mb-8">
              <Avatar>
                <AvatarImage
                  src={`/${
                    AUTHORS.find(({ username, nickname }) =>
                      [username, nickname].includes(post.metadata.author)
                    )?.avatar
                  }`}
                />
                <AvatarFallback>
                  <span className="font-bold">CN</span>
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg leading-5 lg:text-xl lg:leading-6 font-bold">
                  {AUTHORS.find(({ username, nickname }) =>
                    [username, nickname].includes(post.metadata.author)
                  )?.name || "Tác giả không xác định"}
                </p>
                <p>
                  @
                  {AUTHORS.find(({ username, nickname }) =>
                    [username, nickname].includes(post.metadata.author)
                  )?.username || "Unknown"}
                </p>
              </div>
            </div>
            <Separator className="mb-12" />
            <MDXContent />
          </article>
        </div>
        <div className="flex flex-row justify-between mt-8 mx-2 lg:mx-0">
          <Link
            href={`/blog/category/${
              categoriesMap[post.metadata.category] || ""
            }`}
          >
            <Button className="text-base md:text-lg py-5 cursor-pointer">
              <ArrowLeftIcon className="mr-1" />
              <p className="mb-1">Bài viết chuyên mục</p>
            </Button>
          </Link>
          <Link href="/blog">
            <Button className="text-base md:text-lg py-5 cursor-pointer">
              <p className="mb-1">Tất cả bài viết</p>
              <ArrowRightIcon className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 mx-4 lg:mx-0">
          <Separator className="mt-10 mb-5 lg:mt-20 lg:mb-10" />
          <GiscusComments />
        </div>
        <div className="mt-8 mx-4 lg:mx-0">
          <Promo />
        </div>
        <Image
          src="/post_chibi.png"
          alt="chibi image for detail post"
          width={400}
          height={400}
          className="block mx-auto mt-28 -mb-40 lg:mt-40 lg:-mb-28 select-none pointer-events-none w-[250px] sm:w-[300px] md:w-[400px]"
        />
      </div>
    </div>
  );
}
