import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Archive from "@/components/blog/archive";
import PageTitle from "@/components/blog/page-title";
import { getAllPosts, getCategoryCounts } from "@/lib/posts";
import { CATEGORIES, CHAPTER_NUMERALS, getCategoryBySlug } from "@/lib/site";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug((await params).category);
  if (!category) return {};
  return { title: category.title, description: category.description };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getAllPosts().filter((p) => p.categorySlug === slug);
  const chapter = CATEGORIES.findIndex((c) => c.slug === slug);

  return (
    <>
      <PageTitle
        eyebrow={`Chuyên mục · 第${CHAPTER_NUMERALS[chapter]}章`}
        jp={category.kanji}
        title={category.name}
        count={posts.length}
        description={category.description}
      />
      <Archive posts={posts} counts={getCategoryCounts()} active={slug} />
    </>
  );
}
