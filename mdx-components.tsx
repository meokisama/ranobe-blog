import { isValidElement } from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import SeriesDetail from "@/components/post/series-detail";

function YouTube({ id }: { id: string }) {
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-sm bg-surface">
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title="YouTube video"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </figure>
  );
}

function Figure({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <figure>
      <Image
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={800}
        sizes="(min-width: 1024px) 928px, 100vw"
        className="mx-auto h-auto max-h-[88svh] w-auto max-w-full rounded-sm bg-surface"
      />
      {alt && (
        <figcaption className="mt-3 flex items-center justify-center gap-3 font-sans text-[0.8rem] text-muted">
          <span className="h-px w-6 bg-accent" />
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    YouTube,
    SeriesDetail,
    img: (props) => <Figure src={props.src as string} alt={props.alt} />,
    // Markdown wraps a lone image in a paragraph; unwrap it so the <figure>
    // can break out of the text column.
    p: ({ children, ...props }) => {
      if (isValidElement(children) && (children.props as { src?: string }).src) return <>{children}</>;
      return <p {...props}>{children}</p>;
    },
    a: ({ href = "", ...props }) => {
      const external = /^https?:\/\//.test(href);
      return <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props} />;
    },
  };
}
