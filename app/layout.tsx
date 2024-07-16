import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

const title = "Ranobe - Light Novel ẩn giấu nhiều hơn bạn nghĩ / Ranobe";
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
