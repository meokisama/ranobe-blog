"use client";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AUTHORS } from "@/constants";

type Post = {
  slug: string;
  metadata: PostMetadata;
};

interface PostMetadata {
  title: string;
  publishDate: string;
  [key: string]: any;
}

type RenderPostListProps = {
  posts: Post[];
  title: string;
  category: string;
  categoryButton: boolean;
};

const RenderPostList: React.FC<RenderPostListProps> = ({ posts, title, category, categoryButton }) => (
  <div className="w-full space-y-4 max-w-7xl px-4 lg:px-12 mt-10 lg:mt-20">
    <Link href={`/blog/category/${category}`}>
      <div className="flex flex-row w-full justify-between items-center mt-14 mb-10">
        <h1 className="p-4 border-s-4 border-red-400 bg-linear-to-r from-[#fcf4f9] to-transparent dark:from-gray-800 text-xl md:text-2xl lg:text-3xl font-black text-gray-700 dark:text-white">
          {title}
        </h1>
        {categoryButton && (
          <Button variant="outline" className="text-base lg:text-lg flex flex-row justify-center items-center gap-1 py-5 cursor-pointer">
            <p className="hidden sm:block mb-1">Xem chuyên mục</p>
            <ArrowRightIcon />
          </Button>
        )}
      </div>
    </Link>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className="p-4 flex flex-col sm:h-full justify-start rounded-xl bg-[#fbfbfb] dark:bg-accent shadow-lg dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] group hover:-translate-y-2 transition ease-linear hover:shadow-xl border dark:border-none">
            <div className="w-full h-[50%] rounded-xl shadow-lg overflow-hidden">
              <Image
                src={`/posts/${post.metadata.thumbnail}`}
                alt="post thumbnail"
                width={350}
                height={240}
                className="w-full h-full object-cover group-hover:scale-105 transition ease-linear"
              />
            </div>
            <h2 className="text-xl leading-5 lg:leading-6 lg:text-2xl font-bold mt-6 mb-4 pb-0.5 line-clamp-2">{post.metadata.title}</h2>
            <div className="flex flex-row gap-2 justify-start items-center mb-2">
              <Avatar>
                <AvatarImage src={`/${AUTHORS.find(({ username, nickname }) => [username, nickname].includes(post.metadata.author))?.avatar}`} />
                <AvatarFallback>
                  <span className="font-bold">CN</span>
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg leading-5 lg:text-xl lg:leading-6 font-bold">{post.metadata.author}</p>
                <p>{format(new Date(post.metadata.publishDate), "dd MMMM, yyyy", { locale: vi })}</p>
              </div>
            </div>
            <p className="text-lg leading-5 lg:text-xl lg:leading-6 line-clamp-3 mt-2">{post.metadata.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

type PaginationSectionProps = {
  totalPosts: any;
  postsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
};

function PaginationSection({ totalPosts, postsPerPage, currentPage, setCurrentPage }: PaginationSectionProps) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  let activePages = pageNumbers.slice(Math.max(0, currentPage - 1 - pageNumLimit), Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length));

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem key={idx}>
        <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page ? true : false}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(<PaginationEllipsis key="ellipsis-start" onClick={() => setCurrentPage(activePages[0] - 1)} />);
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(<PaginationEllipsis key="ellipsis-end" onClick={() => setCurrentPage(activePages[activePages.length - 1] + 1)} />);
    }

    return renderedPages;
  };

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

type PostListProps = {
  data: any;
  title: string;
  category: string;
  postsPerPage?: number;
  categoryButton?: boolean;
};

export default function PostList({ data, title, category, postsPerPage = 6, categoryButton = true }: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.length <= postsPerPage ? data : data.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <RenderPostList posts={currentPosts} title={title} category={category} categoryButton={categoryButton} />
      {data.length > postsPerPage && (
        <PaginationSection totalPosts={data.length} postsPerPage={postsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}
