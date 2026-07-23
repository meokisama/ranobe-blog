import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AUTHORS } from "@/constants";
import FacebookIcon from "@/components/common/facebook-icon";

export default function AuthorSection() {
  return (
    <>
      <div className="w-full text-center flex flex-col items-center justify-center mt-32">
        <Separator className="mb-8 max-w-[80%] lg:max-w-4xl" />
        <h2 className="text-4xl md:text-6xl font-black">Tác giả</h2>
        <p className="text-lg lg:text-xl text-center px-4 leading-5 mt-2">Chấp bút cho những bài viết trên trang blog này.</p>
        <Separator className="mt-8 max-w-[80%] lg:max-w-4xl" />
      </div>
      <div className="flex flex-col md:flex-row w-full items-center md:items-stretch justify-center gap-12 mt-12 px-4">
        {AUTHORS.map((author) => (
          <div
            key={author.username}
            className="max-w-sm rounded-2xl overflow-hidden backdrop-blur-sm dark:bg-accent dark:shadow-[0_0_10px_rgba(0,0,0,0.3)] shadow-xl hover:-translate-y-2 transition ease-linear"
          >
            <div className="h-40">
              <Image src={`/${author.cover}`} alt="cover image" width={400} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="block mx-auto w-32 h-32 relative -mt-16">
              <Avatar className="w-30 h-30 border-4 border-white">
                <AvatarImage src={`/${author.avatar}`} />
                <AvatarFallback>
                  <span className="font-bold">NR</span>
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center text-lg flex flex-col justify-between items-center h-[50%] px-6">
              <div>
                <p className="text-gray-500">@{author.username}</p>
                <h2 className="font-extrabold text-2xl leading-6">{author.name}</h2>
              </div>
              <div className="mt-6">
                <Separator />
                <p className="text-xl my-2 leading-5 lg:leading-6">{author.role}</p>
                <Separator />
              </div>
              <div className="p-4 my-2">
                <Link href={author.facebook} target="_blank">
                  <Button size="lg" className="text-lg">
                    <FacebookIcon className="w-4 h-4 mr-1 mt-1" />
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
