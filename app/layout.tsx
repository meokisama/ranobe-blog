import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Darker_Grotesque } from "next/font/google";
import "./globals.scss";
import { Providers } from "@/components/common/Provider";
import Footer from "@/components/common/Footer";

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
  src: "./Jaro.ttf",
  variable: "--font-jaro",
  display: "swap",
});

const title = "Ranobe - Light Novel cất giấu nhiều điều hơn bạn nghĩ / Ranobe";
const description =
  "Tìm nơi đâu những giây phút thư giãn, đến nơi nào để đắm chìm vào những câu chuyện phiêu lưu ly kỳ, lãng mạn và hài hước? Đây là một blog sẽ đưa bạn vào những cung bậc cảm xúc như vậy.";

export const metadata: Metadata = {
  title: title,
  description: description,
  creator: "Meoki",
  publisher: "Meoki",
  keywords: ["light novel", "ln", "ranobe", "blog", "tiểu thuyết"],
  metadataBase: new URL("https://ranobe.vn"),
  openGraph: {
    title: title,
    description: description,
    url: "https://ranobe.vn",
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
    <html lang="vi">
      <body
        className={`${playfair_display.variable} ${darker_grotesque.variable} ${jaro.variable}`}
      >
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
