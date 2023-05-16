import Image from "next/image";
import Link from "next/link";
import { PortableText, urlFor } from "~/lib/sanity";
import MoreLink from "~/components/MoreLink";
import designTokens from "~/styles/design-tokens";
import { imageBlurDataURL } from "~/utils/images";
import { type AuthorFeatured } from "~/utils/queries/authors";

import styles from "~/components/homePage/AuthorBio.module.css";

// Fixed 1:1 aspect ratio
const imageWidth = 175;
const imageHeight = imageWidth;

export default function AuthorBio({ author }: { author: AuthorFeatured }) {
  const { breakpoints } = designTokens;
  const image = author?.image;
  const authorName = author?.title;

  return (
    <section className={styles.authorBio}>
      {image?.asset ? (
        <div className={styles.authorBioImage}>
          <div className={styles.authorBioImageInner}>
            <Link
              className={styles.authorBioImageLink}
              as={`/authors/${author?.slug}`}
              href="/authors/[slug]">
              <Image
                src={urlFor(image)
                  .width(imageWidth * 2)
                  .height(imageHeight * 2)
                  .quality(90)
                  .url()}
                width={imageWidth}
                height={imageHeight}
                quality={90}
                sizes={[
                  `(min-width: ${breakpoints.w1150.value}rem) and (max-width: ${breakpoints.w1279.value}rem) 140px`,
                  "175px"
                ].join(",")}
                alt={image?.alt || authorName}
                placeholder="blur"
                blurDataURL={image?.asset?.lqip || imageBlurDataURL}
              />
            </Link>
          </div>
        </div>
      ) : null}

      <h2 className={styles.authorBioHeading}>{authorName}</h2>

      {author?.shortBiography ? <PortableText value={author?.shortBiography} /> : null}

      <MoreLink
        as={`/authors/${author?.slug}`}
        href="/authors/[slug]"
        text={`More about ${authorName?.split(" ")[0]}`}
        align="end"
      />
    </section>
  );
}
