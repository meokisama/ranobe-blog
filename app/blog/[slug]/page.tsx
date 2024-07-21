import fs from "node:fs";
import path from "node:path";
import React from "react";
import dynamic from "next/dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import { format } from "date-fns";
import { ModeToggle } from "@/components/common/toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    const mdxPath = path.join("content", "blogs", `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file for slug ${slug} does not exist`);
    }

    const { metadata } = await import(`@/content/blogs/${slug}.mdx`);

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
  const files = fs.readdirSync(path.join("content", "blogs"));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return params;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const post = await getPost(params);
  const MDXContent = dynamic(() => import(`@/content/blogs/${slug}.mdx`));

  const formattedDate = format(
    new Date(post.metadata.publishDate),
    "MMMM dd, yyyy"
  );

  return (
    <div>
      <ModeToggle />
      <div className="max-w-5xl block mx-auto mt-10 lg:mt-20">
        <Link href="/blog">
          <Button className="text-lg mb-4">Tất cả bài viết</Button>
        </Link>
        <div className="p-4 lg:py-12 lg:px-24 shadow-md bg-[#fbfbfb] dark:bg-[#212121] rounded-2xl dark:shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          <article className="mx-auto min-w-full">
            <div className="pb-8">
              <p className="font-semibold text-lg">
                <span className="text-red-600 pr-1">
                  {post.metadata.publishDate}
                </span>{" "}
                {post.metadata.category}
              </p>
            </div>
            <div className="pb-10">
              <h1 className="text-5xl sm:text-6xl font-black capitalize leading-12">
                {post.metadata.title}
              </h1>
            </div>
            <MDXContent />
          </article>
        </div>
      </div>
    </div>
  );
}
