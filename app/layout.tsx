import type { Metadata, Viewport } from "next";
import { Fraunces, Literata, Be_Vietnam_Pro, JetBrains_Mono, Shippori_Mincho } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { SITE } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jetbrains",
  display: "swap",
});

const shippori = Shippori_Mincho({
  weight: ["500", "700"],
  variable: "--font-shippori",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: { default: SITE.title, template: "%s — Ranobe" },
  description: SITE.description,
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
  metadataBase: new URL(SITE.url),
  openGraph: { title: SITE.title, description: SITE.description, siteName: SITE.name, type: "website", locale: "vi_VN" },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0a0d" },
    { media: "(prefers-color-scheme: light)", color: "#f1ebde" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA4;
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${fraunces.variable} ${literata.variable} ${beVietnam.variable} ${jetbrains.variable} ${shippori.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
