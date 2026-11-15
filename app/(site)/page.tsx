import Hero from "@/components/home/hero";
import Splash from "@/components/home/splash";
import Latest from "@/components/home/latest";
import Marquee from "@/components/home/marquee";
import Chapters from "@/components/home/chapters";
import Reel from "@/components/home/reel";
import Authors from "@/components/home/authors";
import { getAllPosts } from "@/lib/posts";
import { AUTHORS, CATEGORIES, getAuthor } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();

  const heroItems = posts.slice(0, 12).map((p) => ({
    slug: p.slug,
    title: p.title,
    thumbnail: p.thumbnail,
    category: p.kicker || p.category,
  }));

  // The Christmas series, grouped by season (newest first), each in day order.
  const christmas = posts.filter((p) => p.categorySlug === "12-ngay-giang-sinh");
  const years = [...new Set(christmas.map((p) => p.date.slice(0, 4)))].sort().reverse();
  const latestSeason = christmas.filter((p) => p.date.startsWith(years[0])).reverse();

  // Every other category gets a shelf of its own, numbered on from the Christmas one.
  const shelves = [
    { slug: "ki-su-gia", title: "Kí Sự", accent: "Giả", caption: "偽りの記録" },
    { slug: "xa-hoi-tren-giay", title: "Xã Hội", accent: "Trên Giấy", caption: "紙の上の社会" },
    { slug: "phong-van", title: "Phỏng", accent: "Vấn", caption: "インタビュー" },
  ].map((shelf, i) => {
    const category = CATEGORIES.find((c) => c.slug === shelf.slug)!;
    const inCategory = posts.filter((p) => p.categorySlug === shelf.slug);
    return { ...shelf, category, posts: inCategory, index: String(i + 4).padStart(2, "0") };
  });

  const counts = Object.fromEntries(
    AUTHORS.map((a) => [a.username, posts.filter((p) => getAuthor(p.author)?.username === a.username).length]),
  );

  return (
    <>
      <Splash />
      <Hero items={heroItems} total={posts.length} />
      <Latest posts={posts.slice(0, 7)} />
      <Marquee />
      <Chapters posts={posts} />
      <Reel
        index="03"
        caption="聖夜の十二冊"
        title="12 Ngày"
        accent="Giáng Sinh"
        description={`Mỗi mùa đông, mười hai bộ light novel được điểm mặt trong mười hai ngày trước lễ Giáng Sinh. ${christmas.length} bài qua ${years.length} mùa.`}
        href="/blog/category/12-ngay-giang-sinh"
        backdrop="12"
        groups={[{ label: `’${years[0].slice(2)}`, posts: latestSeason }]}
        closing={{
          eyebrow: "Còn nữa",
          title: "Những mùa",
          accent: "trước",
          text: `Xem trọn bộ ${christmas.length} bài của cả ${years.length} mùa Giáng Sinh.`,
        }}
      />
      {shelves.map((shelf) => (
        <Reel
          key={shelf.slug}
          index={shelf.index}
          caption={shelf.caption}
          title={shelf.title}
          accent={shelf.accent}
          description={`${shelf.category.description} ${shelf.posts.length} bài viết.`}
          href={`/blog/category/${shelf.slug}`}
          backdrop={shelf.category.kanji}
          backdropJp
          groups={[{ posts: shelf.posts }]}
          closing={{
            eyebrow: "Chuyên mục",
            title: "Mở",
            accent: shelf.category.name,
            text: `Xem cả ${shelf.posts.length} bài của chuyên mục dưới dạng danh sách.`,
          }}
        />
      ))}
      <Authors counts={counts} index={String(shelves.length + 4).padStart(2, "0")} />
    </>
  );
}
