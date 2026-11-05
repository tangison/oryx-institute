import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogImageMeta } from "@/lib/blog";

/**
 * Renders one blog note. The leading `#` heading of the approved copy
 * is carried by the page's own h1, so the body starts at the first
 * paragraph and the page keeps exactly one h1. Images render with
 * their measured width and height (no layout shift) and their real
 * alt text; the hero loads eagerly, everything after it waits.
 */
export function BlogPostBody({
  body,
  images,
}: {
  body: string;
  images: Record<string, BlogImageMeta>;
}) {
  const stripped = body.replace(/^\s*#\s+.+\n+/, "");

  return (
    <div className="prose-oryx">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt, title }) => {
            const resolved: BlogImageMeta | undefined =
              typeof src === "string" ? images[src] : undefined;
            if (!resolved) return null;
            return (
              <img
                src={resolved.src}
                alt={alt ?? resolved.alt}
                title={title}
                width={resolved.width}
                height={resolved.height}
                loading={resolved.src === "/corner-spa/hero-wide.webp" ? "eager" : "lazy"}
                decoding="async"
              />
            );
          },
          a: ({ href, children }) => {
            const external = typeof href === "string" && /^https?:\/\//.test(href);
            if (external) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            }
            return <a href={href}>{children}</a>;
          },
        }}
      >
        {stripped}
      </ReactMarkdown>
    </div>
  );
}
