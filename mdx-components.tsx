import type { MDXComponents } from "mdx/types";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code";
import InlineCode from "@/components/mdx/inline-code";
import Pre from "@/components/mdx/pre";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    YouTube,
    pre: Pre, // Use the custom Pre component
    code: (props) => {
      const { className, children } = props;
      if (className) {
        return <Code {...props} />;
      }
      return <InlineCode>{children}</InlineCode>;
    },
    h1: (props) => <h1 className="text-5xl font-black pb-4" {...props} />,
    h2: (props) => <h2 className="text-4xl font-bold pb-4" {...props} />,
    h3: (props) => <h3 className="text-3xl font-semibold pb-4 " {...props} />,
    h4: (props) => <h4 className="text-2xl font-medium pb-4" {...props} />,
    h5: (props) => <h5 className="text-lg font-normal pb-4" {...props} />,
    h6: (props) => <h6 className="text-base font-light pb-4" {...props} />,
    p: (props) => (
      <p
        className="text-lg lg:text-xl 2xl:text-[22px] mb-4 leading-6 text-justify "
        {...props}
      />
    ),
    strong: (props) => <strong className="text-red-500" {...props} />,
    li: (props) => <li className="pb-1 text-xl lg:text-2xl" {...props} />,
    ul: (props) => (
      <ul className="list-disc text-xl lg:text-2xl pl-6 pb-4" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal text-xl lg:text-2xl pl-6 pb-4" {...props} />
    ),
    hr: (props) => <hr className="my-4" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="p-4 my-4 border-s-4 border-gray-300 bg-gray-100 dark:border-gray-500 dark:bg-[hsl(var(--background))] text-xl italic font-semibold leading-relaxed text-gray-900 dark:text-[hsl(var(--foreground))]"
        {...props}
      />
    ),
    a: (props) => <a className="hover:underline font-semibold" {...props} />,
    img: (props) => (
      <Image
        src={props.src as string}
        alt={props.alt as string}
        width={900}
        height={900}
        className="rounded-lg lg:rounded-2xl shadow-postimg h-auto w-[400px] sm:w-[900px] block mx-auto my-10"
      />
    ),
  };
}
