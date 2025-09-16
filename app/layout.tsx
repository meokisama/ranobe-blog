import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Darker_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/common/provider";
import Footer from "@/components/common/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollToTop from "@/components/common/scroll-to-top";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  BookmarkIcon,
  HomeIcon,
  MixIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

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

const title =
  "Ranobe - Light Novel cất giấu nhiều điều hơn bạn nghĩ / Light Novel Blog";
const description =
  "Review Light Novel. Phân tích Light Novel. Chia sẻ tài nguyên Light Novel. Blog cho những người đam mê văn học Nhật Bản hiện đại.";

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
    name: "Đọc Raw",
    link: "https://hub.ranobe.vn",
    icon: <ReaderIcon className="h-4 w-4 text-neutral-800 dark:text-white" />,
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
        <Providers>
          <div vaul-drawer-wrapper="" className="bg-background">
            <FloatingNav navItems={navItems} />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4 as string} />
    </html>
  );
}
