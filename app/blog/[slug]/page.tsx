import fs from "node:fs";
import path from "node:path";
import React from "react";
import dynamic from "next/dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ModeToggle } from "@/components/common/toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params);
  return {
    title: post.metadata.title,
    description: post.metadata.description,
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

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await getPost(params);
  const MDXContent = dynamic(() => import(`@/posts/${slug}.mdx`));

  const formattedDate = format(
    new Date(post.metadata.publishDate),
    "dd MMMM, yyyy",
    { locale: vi }
  );

  return (
    <div>
      <ModeToggle />
      <div className="max-w-5xl block mx-auto mt-10 lg:mt-20">
        <Image
          src="/saki.webp"
          alt="blog post saki"
          width={400}
          height={400}
          className="w-[300px] lg:w-[400px] h-auto relative z-10 translate-y-[5.2rem] lg:translate-y-[7rem] block mx-auto mt-[-5rem] lg:mt-[-10rem]"
        />
        <div className="p-4 lg:py-12 lg:px-24 bg-[#fbfbfb] dark:bg-[#212121] rounded-2xl shadow-[0_3px_8px_rgba(0,0,0,0.24)] dark:shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          <Link href="/blog">
            <Button className="text-lg mb-8 flex flex-row items-center gap-1">
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
                  src={
                    post.metadata.author === "NaviRanobe"
                      ? "/naviranobe.jpg"
                      : "/themeoki.jpg"
                  }
                />
                <AvatarFallback>
                  <span className="font-bold">CN</span>
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg leading-5 lg:text-xl lg:leading-6 font-bold">
                  {post.metadata.author === "NaviRanobe"
                    ? "Đứa biết nhiều nhất về Light Novel ở Việt Nam"
                    : "Đứa biết nhiều thứ 2 về Light Novel chuyên reply comment xin name"}
                </p>
                <p>
                  {post.metadata.author === "NaviRanobe"
                    ? "@NaviRanobe"
                    : "@TheMeoki"}
                </p>
              </div>
            </div>
            <Separator className="mb-12" />
            <MDXContent />
          </article>
        </div>
      </div>
    </div>
  );
}
