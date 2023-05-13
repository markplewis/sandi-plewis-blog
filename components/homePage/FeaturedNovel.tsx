import Image from "next/image";
import Link from "next/link";
import MoreLink from "~/components/MoreLink";
import PageTitle from "~/components/PageTitle";
import InternalLink from "~/components/portableText/InternalLink";
import { PortableText, urlFor } from "~/lib/sanity";
import designTokens from "~/styles/design-tokens";
import { imageBlurDataURL } from "~/utils/images";
import { type NovelFeatured } from "~/utils/queries/novels";

import styles from "~/components/homePage/FeaturedNovel.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function FeaturedNovel({ novel }: { novel: NovelFeatured }) {
  const { breakpoints } = designTokens;
  const image = novel?.image;
  const imageWidth = 280;
  const imageHeight = image?.asset?.aspectRatio
    ? Math.round(imageWidth / image?.asset?.aspectRatio)
    : imageWidth;

  return (
    <div className={styles.featuredNovel}>
      {image?.asset ? (
        <div className={styles.featuredNovelImage}>
          <Link
            className={styles.featuredNovelImageLink}
            as={`/novels/${novel?.slug}`}
            href="/novels/[slug]">
            <Image
              src={urlFor(image)
                .width(imageWidth * 2)
                .height(imageHeight * 2)
                .quality(90)
                .url()}
              width={imageWidth}
              height={imageHeight}
              sizes={[
                `(min-width: ${breakpoints.w1280.value}rem) 280px`,
                `(min-width: ${breakpoints.w1150.value}rem) 20vw`,
                `(min-width: ${breakpoints.w820.value}rem) 280px`,
                `(min-width: ${breakpoints.w600.value}rem) 32vw`,
                "90vw"
              ].join(",")}
              quality={90}
              alt={image?.alt || novel?.title}
              placeholder="blur"
              blurDataURL={image?.asset?.lqip || imageBlurDataURL}
              priority={true} // LCP image
            />
          </Link>
        </div>
      ) : null}

      <div className={styles.featuredNovelInfo}>
        <PageTitle>{novel?.title}</PageTitle>

        {novel?.overview ? (
          <PortableText value={novel?.overview} components={portableTextComponents} />
        ) : null}

        <div className={styles.featuredNoveMoreLink}>
          <MoreLink
            as={`/novels/${novel?.slug}`}
            href="/novels/[slug]"
            text="More information"
            // TODO: generate a secondary color that has sufficient contrast against the primary
            // color and also when the primary color is applied to text on top of it
            // fgColor="--color-black"
            // bgColor="--color-white"
            fgColor="--page-color-primary-text"
            bgColor="--page-color-primary"
            border={true}
            align="end"
          />
        </div>
      </div>
    </div>
  );
}
