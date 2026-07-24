"use client";

import { usePathname } from "next/navigation";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/common/footer";
import { Bookmark, Home, Sparkles, BookOpen } from "lucide-react";

const navItems = [
  {
    name: "Trang chủ",
    link: "/",
    icon: <Home className="h-4 w-4 text-neutral-800 dark:text-white" />,
  },
  {
    name: "Đọc Raw",
    link: "https://hub.ranobe.vn",
    icon: <BookOpen className="h-4 w-4 text-neutral-800 dark:text-white" />,
  },
  {
    name: "Bài viết",
    link: "/blog",
    icon: <Bookmark className="h-4 w-4 text-neutral-800 dark:text-white" />,
  },
  {
    name: "Giveaway Booster",
    link: "/ga",
    icon: <Sparkles className="h-4 w-4 text-neutral-800 dark:text-white" />,
  },
];

// Renders the site chrome (floating nav + footer) around normal pages, but
// hides it on the Keystatic admin (/keystatic) so the CMS gets a clean canvas.
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/keystatic");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <FloatingNav navItems={navItems} />
      {children}
      <Footer />
    </>
  );
}
