import Image from "next/image";
import { PortableText, urlFor } from "lib/sanity";
import MoreLink from "components/MoreLink";
import InternalLink from "components/portableText/InternalLink";
import designTokens from "styles/design-tokens";
import { imageBlurDataURL } from "utils/images";

import styles from "components/homePage/AuthorBio.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

// 1:1 aspect ratio
const imageWidth = 175;
const imageHeight = imageWidth;

export default function AuthorBio({ author }) {
  const { breakpoints } = designTokens;
  const image = author?.image;

  return (
    <section className={styles.authorBio}>
      {image ? (
        <div className={styles.authorBioImage}>
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
            alt={image?.alt || author?.name}
            placeholder="blur"
            blurDataURL={image?.lqip || imageBlurDataURL}
          />
        </div>
      ) : null}

      <h2 className={styles.authorBioHeading}>{author?.name}</h2>

      {author?.shortBiography ? (
        <PortableText value={author?.shortBiography} components={portableTextComponents} />
      ) : null}

      <MoreLink
        as={`/authors/${author?.slug}`}
        href="/authors/[slug]"
        text={`More about ${author?.name?.split(" ")[0]}`}
        align="end"
      />
    </section>
  );
}
