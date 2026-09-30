import Image from "next/image";

/**
 * Photographic register figure: full-bleed or contained image. The
 * photographs stand on their own; nothing is set underneath them.
 */
export function PhotoFigure({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 90rem) 1440px, 100vw",
  ratio = "aspect-[3/2]",
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden ${ratio}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </figure>
  );
}
