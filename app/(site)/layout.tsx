import Header from "@/components/site/header";
import Footer from "@/components/site/footer";
import SmoothScroll from "@/components/site/smooth-scroll";
import SearchPalette from "@/components/site/search-palette";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="relative">{children}</main>
      <Footer />
      <SearchPalette />
      <div className="grain" aria-hidden />
    </>
  );
}
