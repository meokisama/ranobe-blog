import fs from "node:fs";
import path from "node:path";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from "@radix-ui/react-icons";
import IconBar from "@/components/common/icon-bar";
import PageBackground from "@/components/common/page-background";
import StrokeTitle from "@/components/common/stroke-title";
import AuthorAvatar from "@/components/common/author-avatar";
import { getAuthor, getCategorySlug } from "@/constants";
import type { PostMetadata } from "@/lib/types";
import { Promo } from "@/components/home/promo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost({ slug });
  return {
    title: post.metadata.title + " - Ranobe",
    description: post.metadata.description,
    authors: { name: post.metadata.author },
    metadataBase: new URL("https://ranobe.vn"),
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      images: post.metadata.thumbnail,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
      images: post.metadata.thumbnail,
    },
  };
}

async function getPost({ slug }: { slug: string }): Promise<{ slug: string; metadata: PostMetadata }> {
  try {
    const mdxPath = path.join("posts", `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file for slug ${slug} does not exist`);
    }

    const { metadata } = await import(`@/posts/${slug}.mdx`);

    return { slug, metadata };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error(`Unable to fetch the post for slug: ${slug}`);
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("posts")).filter((filename) => filename.endsWith(".mdx") && !filename.startsWith("."));

  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const post = await getPost({ slug });
  const MDXContent = dynamic(() => import(`@/posts/${slug}.mdx`));

  const formattedDate = format(new Date(post.metadata.publishDate), "dd MMMM, yyyy", { locale: vi });
  const author = getAuthor(post.metadata.author);

  return (
    <div className="relative">
      <IconBar />
      <StrokeTitle variant="post" />
      <PageBackground />
      <div className="max-w-5xl block mx-auto relative z-10">
        <Image
          src="/mamasuki.png"
          alt="blog post mamasuki"
          width={500}
          height={591}
          priority
          className="w-75 md:w-100 lg:w-125 h-auto relative z-100 translate-y-[2.6rem] md:translate-y-14 lg:translate-y-[4.4rem] block mx-auto md:mr-0 translate-x-8 md:translate-x-0 select-none pointer-events-none"
        />
        <div className="p-6 lg:py-12 lg:px-24 bg-[#fbfbfb] dark:bg-accent rounded-2xl shadow-[0_3px_8px_rgba(0,0,0,0.24)] dark:shadow-[0_0_10px_rgba(0,0,0,0.6)]">
          <div className="flex flex-row justify-between gap-2 mb-8">
            <Link href="/blog" className="flex flex-row relative z-50">
              <Button className="text-lg flex flex-row items-center gap-1 cursor-pointer">
                <ArrowLeftIcon className="mt-1" />
                <p>Tất cả bài viết</p>
              </Button>
            </Link>
            <Link href="/" className="flex flex-row relative z-50">
              <Button className="text-lg flex flex-row items-center gap-1 cursor-pointer">
                <HomeIcon className="mt-1" />
                <p>Trang Chủ</p>
              </Button>
            </Link>
          </div>
          <Separator className="mb-4" />
          <article className="mx-auto min-w-full">
            <div className="pb-5">
              <h1 className="text-5xl sm:text-6xl font-black capitalize leading-12">{post.metadata.title}</h1>
            </div>
            <div className="pb-8 italic">
              <p className="font-semibold text-lg">
                Đăng tải <span className="text-red-500 pr-1">{formattedDate}</span>
                {" | "}
                {post.metadata.category}
              </p>
            </div>
            <Separator className="mb-8" />
            <div className="flex flex-row gap-2 justify-start items-center mb-8">
              <AuthorAvatar name={post.metadata.author} />
              <div>
                <p className="text-lg leading-5 lg:text-xl lg:leading-6 font-bold">{author?.name || "Tác giả không xác định"}</p>
                <p>@{author?.username || "Unknown"}</p>
              </div>
            </div>
            <Separator className="mb-12" />
            <MDXContent />
          </article>
        </div>
        <div className="flex flex-row justify-between mt-8 mx-2 lg:mx-0">
          <Link href={`/blog/category/${getCategorySlug(post.metadata.category)}`}>
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
          <Promo />
        </div>
        <Link href="/">
          <Image
            src="/post_chibi.png"
            alt="chibi image for detail post"
            width={400}
            height={400}
            className="block mx-auto mt-28 -mb-40 lg:mt-40 lg:-mb-28 select-none pointer-events-none w-62.5 sm:w-75 md:w-100"
          />
        </Link>
      </div>
    </div>
  );
}
