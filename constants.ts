const CATEGORIES = [
  {
    title: "Xã Hội Vận Hành Trên Giấy Như Thế Nào?",
    category: "xa-hoi-tren-giay",
    metadataCategory: "Xã Hội Trên Giấy",
    description:
      "Khám phá cách xã hội vận hành qua những câu chuyện, bối cảnh, chi tiết, nội dung được gửi gắm qua những trang giấy.",
  },
  {
    title: "12 Ngày Light Novel Giáng Sinh",
    category: "12-ngay-giang-sinh",
    metadataCategory: "12 Ngày Giáng Sinh",
    description:
      "Loạt bài viết review light novel đặc biệt đếm ngược 12 ngày tới Giáng Sinh.",
  },
  {
    title: "Kí Sự Giả",
    category: "ki-su-gia",
    metadataCategory: "Kí Sự Giả",
    description: "Những câu chuyện chưa kể vì chưa kịp kể.",
  },
  {
    title: "Phỏng Vấn",
    category: "phong-van",
    metadataCategory: "Phỏng Vấn",
    description: "Phỏng vấn các nhà xuất bản light novel Việt Nam.",
  },
];

const AUTHORS = [
  {
    name: "Đứa biết nhiều nhất về Light Novel ở Việt Nam",
    username: "NaviRanobe",
    nickname: "HtL",
    avatar: "naviranobe.jpg",
    cover: "naviranobe_cover.jpg",
    role: "Cây viết chủ lực, chuyên phân tích review đánh giá khen chê châm biếm Light Novel.",
    facebook: "https://facebook.com/NaviRanobe",
  },
  {
    name: "Đứa biết nhiều thứ 2 về Light Novel chuyên reply comment xin name",
    username: "TheMeoki",
    nickname: "Meoki",
    avatar: "themeoki.jpg",
    cover: "themeoki_cover.jpg",
    role: "Thích khai thác những yếu tố khía cạnh sự kiện góc nhìn bên lề ít hoặc chưa ai chú ý",
    facebook: "https://facebook.com/TheMeoki",
  },
];

export type Author = (typeof AUTHORS)[number];

// Posts reference an author by either their username or short nickname, so look
// up by both. Returns undefined when no author matches.
export function getAuthor(name?: string): Author | undefined {
  if (!name) return undefined;
  return AUTHORS.find(({ username, nickname }) => [username, nickname].includes(name));
}

// Maps a post's display category (metadata) to its URL slug. Empty string when
// no category matches (falls back to a bare /blog/category link).
export function getCategorySlug(metadataCategory?: string): string {
  return CATEGORIES.find((item) => item.metadataCategory === metadataCategory)?.category ?? "";
}

export { CATEGORIES, AUTHORS };
