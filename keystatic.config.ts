import { config, collection, fields } from "@keystatic/core";
import { block } from "@keystatic/core/content-components";

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Ranobe" },
  },
  collections: {
    posts: collection({
      label: "Bài viết",
      slugField: "title",
      path: "posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishDate"],
      schema: {
        title: fields.slug({
          name: {
            label: "Tiêu đề",
            validation: { isRequired: true },
          },
          slug: {
            label: "Đường dẫn (slug)",
            description: "Phần cuối URL: /blog/<slug>",
          },
        }),
        author: fields.select({
          label: "Tác giả",
          options: [
            { label: "NaviRanobe", value: "NaviRanobe" },
            { label: "Meoki", value: "Meoki" },
          ],
          defaultValue: "NaviRanobe",
        }),
        thumbnail: fields.image({
          label: "Thumbnail",
          description: "Ảnh đại diện bài viết — kéo/thả để upload, tự lưu vào public/posts.",
          directory: "public/posts",
          publicPath: "/posts/",
          validation: { isRequired: true },
        }),
        publishDate: fields.date({
          label: "Ngày đăng",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Mô tả",
          multiline: true,
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Chuyên mục",
          options: [
            { label: "12 Ngày Giáng Sinh", value: "12 Ngày Giáng Sinh" },
            { label: "Kí Sự Giả", value: "Kí Sự Giả" },
            { label: "Xã Hội Trên Giấy", value: "Xã Hội Trên Giấy" },
            { label: "Phỏng Vấn", value: "Phỏng Vấn" },
          ],
          defaultValue: "12 Ngày Giáng Sinh",
        }),
        content: fields.mdx({
          label: "Nội dung",
          description: "Nội dung bài viết. Ảnh trong bài dán link (Cloudinary...) theo cú pháp Markdown.",
          components: {
            SeriesDetail: block({
              label: "Bảng thông tin Light Novel",
              schema: {
                jp: fields.text({ label: "Tựa tiếng Nhật (JP)" }),
                vn: fields.text({ label: "Tạm dịch (VN)" }),
                romaji: fields.text({ label: "Romaji" }),
                publisher: fields.text({ label: "NXB" }),
                author: fields.text({ label: "Tác giả" }),
                illustrator: fields.text({ label: "Minh họa" }),
                release: fields.text({ label: "Ngày phát hành" }),
                category: fields.text({ label: "Thể loại" }),
                volume: fields.text({ label: "Số tập" }),
                en_trans: fields.text({ label: "Bản dịch tiếng Anh" }),
                en_trans_url: fields.text({ label: "Link bản dịch tiếng Anh" }),
                vi_trans: fields.text({ label: "Bản dịch tiếng Việt" }),
                vi_trans_url: fields.text({ label: "Link bản dịch tiếng Việt" }),
                safety: fields.text({ label: "Độ an toàn" }),
              },
            }),
          },
        }),
      },
    }),
  },
});
