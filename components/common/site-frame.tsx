"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/common/site-header";
import IconBar from "@/components/common/icon-bar";
import Footer from "@/components/common/footer";
import { Companion } from "@/components/common/companion";

// Renders the site chrome (sticky top header, bottom-left icon bar, footer and
// the Zundamon companion)
// around normal pages, but hides it on the Keystatic admin (/keystatic) so the
// CMS gets a clean canvas.
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/keystatic");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <SiteHeader />
      {children}
      <IconBar />
      <Footer />
      <Companion />
    </>
  );
}
