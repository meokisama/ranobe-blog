export const SITE = {
  name: "Ranobe",
  url: "https://ranobe.vn",
  title: "Ranobe: Review & phân tích Light Novel",
  description:
    "Review Light Novel. Phân tích Light Novel. Chia sẻ tài nguyên Light Novel. Blog cho những người đam mê văn học Nhật Bản hiện đại.",
};

export const CATEGORIES = [
  {
    slug: "12-ngay-giang-sinh",
    name: "12 Ngày Giáng Sinh",
    title: "12 Ngày Light Novel Giáng Sinh",
    kanji: "聖夜",
    description: "Loạt bài viết review light novel đặc biệt đếm ngược 12 ngày tới Giáng Sinh.",
  },
  {
    slug: "ki-su-gia",
    name: "Kí Sự Giả",
    title: "Kí Sự Giả",
    kanji: "偽記",
    description: "Những câu chuyện chưa kể vì chưa kịp kể.",
  },
  {
    slug: "xa-hoi-tren-giay",
    name: "Xã Hội Trên Giấy",
    title: "Xã Hội Vận Hành Trên Giấy Như Thế Nào?",
    kanji: "紙上",
    description:
      "Khám phá cách xã hội vận hành qua những câu chuyện, bối cảnh, chi tiết, nội dung được gửi gắm qua những trang giấy.",
  },
  {
    slug: "phong-van",
    name: "Phỏng Vấn",
    title: "Phỏng Vấn",
    kanji: "対談",
    description: "Phỏng vấn các nhà xuất bản light novel Việt Nam.",
  },
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CHAPTER_NUMERALS = ["一", "二", "三", "四", "五", "六"];

export const AUTHORS = [
  {
    username: "NaviRanobe",
    nickname: "HtL",
    name: "Đứa biết nhiều nhất về Light Novel ở Việt Nam",
    avatar: "/naviranobe.jpg",
    cover: "/naviranobe_cover.jpg",
    role: "Cây viết chủ lực, chuyên phân tích review đánh giá khen chê châm biếm Light Novel.",
    facebook: "https://facebook.com/NaviRanobe",
  },
  {
    username: "TheMeoki",
    nickname: "Meoki",
    name: "Đứa biết nhiều thứ 2 về Light Novel chuyên reply comment xin name",
    avatar: "/themeoki.jpg",
    cover: "/themeoki_cover.jpg",
    role: "Thích khai thác những yếu tố khía cạnh sự kiện góc nhìn bên lề ít hoặc chưa ai chú ý.",
    facebook: "https://facebook.com/TheMeoki",
  },
] as const;

export type Author = (typeof AUTHORS)[number];

export function getAuthor(name?: string): Author | undefined {
  if (!name) return undefined;
  return AUTHORS.find((a) => a.username === name || a.nickname === name);
}

export function getCategoryByName(name?: string): Category | undefined {
  return CATEGORIES.find((c) => c.name === name);
}

export function getCategoryBySlug(slug?: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
