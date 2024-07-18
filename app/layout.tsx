import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.scss";

const playfair_display = Playfair_Display({
  subsets: ["vietnamese"],
  variable: "--font-playfair-display",
  display: "swap",
});

const poppins = Poppins({
  weight: "900",
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const title = "Ranobe - Light Novel cất giấu nhiều điều hơn bạn nghĩ / Ranobe";
const description =
  "Tìm nơi đâu những giây phút thư giãn, đến nơi nào để đắm chìm vào những câu chuyện phiêu lưu ly kỳ, lãng mạn và hài hước? Đây là một blog sẽ đưa bạn vào những cung bậc cảm xúc như vậy.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${playfair_display.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
