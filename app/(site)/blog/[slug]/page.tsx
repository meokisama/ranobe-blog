import type { ComponentType } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PostCover, ReadingProgress } from "@/components/post/post-chrome";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import { getAllPosts, getPost, getPostSlugs, type Post } from "@/lib/posts";
import { CATEGORIES, CHAPTER_NUMERALS, SITE, getAuthor } from "@/lib/site";
import { formatDate, formatDateLong } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.fullTitle,
    description: post.description,
    authors: { name: post.author },
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.fullTitle,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.thumbnail,
    },
    twitter: { card: "summary_large_image", title: post.fullTitle, description: post.description, images: post.thumbnail },
  };
}

function NeighbourCard({ post, direction }: { post: Post; direction: "prev" | "next" }) {
  const next = direction === "next";
  return (
    <Link href={`/blog/${post.slug}`} className="group relative flex min-h-64 flex-col justify-between overflow-hidden p-6 md:min-h-80 md:p-10">
      <Image
        src={post.thumbnail}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-0 transition-all duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <span className={`label relative flex items-center gap-2 text-muted transition-colors duration-500 group-hover:text-white/80 ${next ? "justify-end" : ""}`}>
        {!next && <ArrowLeft className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />}
        {next ? "Bài mới hơn" : "Bài cũ hơn"}
        {next && <ArrowRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />}
      </span>
      <span className={`relative ${next ? "text-right" : ""}`}>
        <span className="label text-accent">{post.kicker || post.category}</span>
        <span className="display mt-3 block text-[clamp(1.6rem,3vw,2.6rem)] text-balance transition-colors duration-500 group-hover:text-white">
          {post.title}
        </span>
      </span>
    </Link>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = (await import(`@/posts/${slug}.mdx`)) as { default: ComponentType };

  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  const newer = posts[i - 1];
  const older = posts[i + 1];
  const related = posts.filter((p) => p.categorySlug === post.categorySlug && p.slug !== slug).slice(0, 3);
  const author = getAuthor(post.author);
  const chapter = CATEGORIES.findIndex((c) => c.slug === post.categorySlug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.fullTitle,
    description: post.description,
    datePublished: post.date,
    image: `${SITE.url}${post.thumbnail}`,
    author: { "@type": "Person", name: author?.username ?? post.author },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ReadingProgress />

      {/* Masthead */}
      <header className="gutter pt-28 md:pt-40">
        <div className="page-enter label flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
          <Link href="/blog" className="group flex items-center gap-2 transition-colors hover:text-ink">
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Thư viện
          </Link>
          <span className="h-px w-8 bg-line" />
          <Link href={`/blog/category/${post.categorySlug}`} className="text-accent transition-opacity hover:opacity-70">
            {chapter >= 0 && <span className="mr-2 font-jp text-[0.8rem] tracking-normal">第{CHAPTER_NUMERALS[chapter]}章</span>}
            {post.category}
          </Link>
          {post.kicker && <span>{post.kicker}</span>}
        </div>

        <h1 className="display mt-8 max-w-[20ch] text-[clamp(2.6rem,7.6vw,7.5rem)] text-balance md:mt-10">
          <SplitWords text={post.title} onView={false} delay={0.1} stagger={0.05} />
        </h1>

        <div className="page-enter mt-10 grid gap-8 border-t border-line pt-6 [animation-delay:0.4s] md:mt-14 md:grid-cols-12">
          <div className="flex items-center gap-4 md:col-span-4">
            {author && (
              <Image src={author.avatar} alt={author.username} width={48} height={48} className="size-12 rounded-full object-cover ring-1 ring-line" />
            )}
            <div>
              <p className="label text-muted">Chấp bút</p>
              <p className="mt-1.5 font-display text-xl italic">{author?.username ?? post.author}</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-6 md:col-span-3">
            <div>
              <dt className="label text-muted">Đăng ngày</dt>
              <dd className="mt-2 text-[0.95rem]">{formatDateLong(post.date)}</dd>
            </div>
            <div>
              <dt className="label text-muted">Thời lượng</dt>
              <dd className="mt-2 text-[0.95rem]">{post.readingMinutes} phút đọc</dd>
            </div>
          </dl>
          <p className="font-serif text-[1.02rem] italic leading-relaxed text-muted md:col-span-5">{post.description}</p>
        </div>
      </header>

      <div className="gutter mt-10 md:mt-14">
        <PostCover src={post.thumbnail} alt={post.title} jp={post.jp} />
      </div>

      {/* Body */}
      <div className="gutter article mt-14 md:mt-24">
        <Content />
      </div>

      {/* Sign-off */}
      <div className="gutter mt-16 md:mt-24">
        <div className="mx-auto max-w-[42rem]">
          <p className="text-center font-jp text-accent">— 完 —</p>
          {author && (
            <a
              href={author.facebook}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 flex items-center gap-5 rounded-sm border border-line p-5 transition-colors duration-500 hover:border-ink md:p-7"
            >
              <Image src={author.avatar} alt={author.username} width={72} height={72} className="size-16 rounded-full object-cover md:size-[4.5rem]" />
              <div className="min-w-0 flex-1">
                <p className="label text-muted">Người viết</p>
                <p className="mt-2 font-display text-2xl italic">{author.username}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{author.role}</p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 transition-transform duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-accent" strokeWidth={1.5} />
            </a>
          )}
        </div>
      </div>

      {/* Neighbours */}
      <nav className="mt-20 grid border-y border-line md:mt-32 md:grid-cols-2 md:divide-x md:divide-line" aria-label="Bài viết liền kề">
        {older ? <NeighbourCard post={older} direction="prev" /> : <div />}
        {newer ? (
          <div className="border-t border-line md:border-t-0">
            <NeighbourCard post={newer} direction="next" />
          </div>
        ) : (
          <div />
        )}
      </nav>

      {/* Related */}
      {related.length > 0 && (
        <section className="gutter pt-20 md:pt-28">
          <div className="flex items-end justify-between border-b border-line pb-5">
            <h2 className="display text-[clamp(2rem,4.5vw,3.8rem)]">
              Cùng <em className="text-accent">chuyên mục</em>
            </h2>
            <Link href={`/blog/category/${post.categorySlug}`} className="group label hidden items-center gap-2 pb-2 text-muted transition-colors hover:text-ink sm:flex">
              {post.category}
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>
          <div className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-3">
            {related.map((p, j) => (
              <Reveal key={p.slug} delay={j * 0.08}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-surface">
                    <Image
                      src={p.thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
                    />
                  </div>
                  <p className="label mt-5 text-muted">
                    <span className="text-accent">{p.kicker || p.category}</span> · {formatDate(p.date)}
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-[1.12] tracking-[-0.015em] text-balance">
                    <span className="link-underline">{p.title}</span>
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
