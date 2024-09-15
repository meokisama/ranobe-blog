import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Darker_Grotesque } from "next/font/google";
import "./globals.scss";
import { Providers } from "@/components/common/provider";
import Footer from "@/components/common/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollToTop from "@/components/common/scroll-to-top";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { BookmarkIcon, HomeIcon, MixIcon } from "@radix-ui/react-icons";

const playfair_display = Playfair_Display({
  subsets: ["vietnamese"],
  variable: "--font-playfair-display",
  display: "swap",
});

const darker_grotesque = Darker_Grotesque({
  subsets: ["vietnamese"],
  variable: "--font-darker-grotesque",
  display: "swap",
});

const jaro = localFont({
  weight: "400",
  src: "./Jaro.ttf",
  variable: "--font-jaro",
  display: "swap",
});

const title = "Ranobe - Light Novel cất giấu nhiều điều hơn bạn nghĩ / Ranobe";
const description =
  "Có bao giờ bạn tự nghĩ những cuốn light novel ngoài kia có thể ẩn chứa những bí mật kín đáo hơn những gì mắt thấy? Đã bao giờ bạn tự hỏi liệu mình đã thật sự thấu hiểu hết những thông điệp tinh tế mà tác giả khéo léo ẩn giấu giữa những dòng chữ? Có lẽ, light novel không chỉ là những câu chuyện bình dị, mà còn là những bí mật chờ đợi bạn khám phá.";

export const metadata: Metadata = {
  title: title,
  description: description,
  creator: "Meoki",
  publisher: "Meoki",
  keywords: [
    "light novel",
    "ln",
    "ranobe",
    "blog",
    "tiểu thuyết",
    "light novel blog",
  ],
  metadataBase: new URL("https://ranobe.vn"),
  openGraph: {
    title: title,
    description: description,
    siteName: title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
};

const navItems = [
  {
    name: "Trang chủ",
    link: "/",
    icon: <HomeIcon className="h-4 w-4 text-neutral-800 dark:text-white" />,
  },
  {
    name: "Bài viết",
    link: "/blog",
    icon: <BookmarkIcon className="h-4 w-4 text-neutral-800 dark:text-white" />,
  },
  {
    name: "Giveaway Booster",
    link: "/ga",
    icon: <MixIcon className="h-4 w-4 text-neutral-800 dark:text-white" />,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${playfair_display.variable} ${darker_grotesque.variable} ${jaro.variable}`}
      >
        <ScrollToTop />
        <FloatingNav navItems={navItems} />
        <Providers>{children}</Providers>
        <Footer />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4 as string} />
    </html>
  );
}
