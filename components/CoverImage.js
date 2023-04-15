import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";

// https://www.sanity.io/docs/presenting-images
// https://nextjs.org/docs/basic-features/image-optimization
// https://nextjs.org/docs/api-reference/next/image

export default function CoverImage({
  className,
  title,
  image,
  alt = null,
  slug = null,
  width = 1240,
  height = 540
  // sizes = []
}) {
  // See: https://nextjs.org/docs/api-reference/next/image
  // Can't produce <picture> elements (no art direction)
  const img = image ? (
    <Image
      src={urlFor(image)
        .width(width * 2)
        .height(height * 2)
        .url()}
      width={width}
      height={height}
      // sizes={sizes.length ? sizes.join(",") : undefined}
      alt={alt || image?.alt}
      placeholder="blur"
      blurDataURL={image?.lqip || imageBlurDataURL}
    />
  ) : null;

  return (
    <div className={className}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {img}
        </Link>
      ) : (
        img
      )}
    </div>
  );
}
