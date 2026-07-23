import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Darker_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/common/provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollToTop from "@/components/common/scroll-to-top";
import SiteFrame from "@/components/common/site-frame";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

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

const title = "Ranobe - Review Light Novel. Phân tích Light Novel.";
const description =
  "Review Light Novel. Phân tích Light Novel. Chia sẻ tài nguyên Light Novel. Blog cho những người đam mê văn học Nhật Bản hiện đại.";

export const metadata: Metadata = {
  title: title,
  description: description,
  creator: "Meoki",
  publisher: "Meoki",
  keywords: [
    "light novel",
    "đọc light novel",
    "phân tích light novel",
    "review light novel",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className={`${playfair_display.variable} ${darker_grotesque.variable} ${jaro.variable}`}>
        <ScrollToTop />
        <Providers>
          <div vaul-drawer-wrapper="" className="bg-background">
            <SiteFrame>{children}</SiteFrame>
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4 as string} />
    </html>
  );
}
