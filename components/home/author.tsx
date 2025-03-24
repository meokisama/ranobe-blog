import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AUTHORS as authors } from "@/constants";

export default function AuthorSection() {
  return (
    <>
      <div className="w-full text-center flex flex-col items-center justify-center mt-32">
        <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
        <h2 className="text-4xl md:text-6xl font-black">Tác giả</h2>
        <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">
          Chấp bút cho những bài viết trên trang blog này.
        </p>
        <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
      </div>
      <div className="flex flex-col md:flex-row w-full items-center md:items-stretch justify-center gap-12 mt-12 px-4">
        {authors.map((author, index) => (
          <div
            key={index}
            className="max-w-sm rounded-2xl overflow-hidden backdrop-blur-sm dark:bg-[var(--accent)] dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] shadow-xl hover:-translate-y-2 transition ease-linear"
          >
            <div className="h-40">
              <Image
                src={`/${author.cover}`}
                alt="cover image"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="block mx-auto w-32 h-32 relative -mt-16">
              <Avatar className="w-[120px] h-[120px] border-4 border-white">
                <AvatarImage src={`/${author.avatar}`} />
                <AvatarFallback>
                  <span className="font-bold">NR</span>
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center text-lg flex flex-col justify-between items-center h-[50%] px-6">
              <div>
                <p className="text-gray-500">@{author.username}</p>
                <h2 className="font-extrabold text-2xl leading-6">
                  {author.name}
                </h2>
              </div>
              <div className="mt-6">
                <Separator />
                <p className="text-xl my-2 leading-5 lg:leading-6">
                  {author.role}
                </p>
                <Separator />
              </div>
              <div className="p-4 my-2">
                <Link href={author.facebook} target="_blank">
                  <Button size="lg" className="text-lg">
                    <svg
                      className="w-4 h-4 mr-1 mt-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Facebook
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
