import Image from "next/image";
import Link from "next/link";
import MoreLink from "~/components/MoreLink";
import PageTitle from "~/components/PageTitle";
import { PortableText, urlFor } from "~/lib/sanity";
import designTokens from "~/styles/design-tokens";
import { imageBlurDataURL } from "~/utils/images";
import { type FeaturedItem } from "~/utils/queries/homePage";

import styles from "~/components/homePage/FeaturedItem.module.css";

export default function FeaturedItem({ item }: { item: FeaturedItem }) {
  const { breakpoints } = designTokens;
  const image = item?.image;
  const imageWidth = 280;
  const imageHeight = image?.asset?.aspectRatio
    ? Math.round(imageWidth / image?.asset?.aspectRatio)
    : imageWidth;

  let urlPath;

  switch (item._type) {
    case "newsItem":
      urlPath = "news";
      break;
    case "novel":
    default:
      urlPath = "novels";
      break;
  }

  return (
    <div className={styles.featuredItem}>
      {image?.asset ? (
        <div className={styles.featuredItemImage}>
          <Link
            className={styles.featuredItemImageLink}
            as={`/${urlPath}/${item?.slug}`}
            href={`/${urlPath}/[slug]`}>
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
              alt={image?.alt || item?.title}
              placeholder="blur"
              blurDataURL={image?.asset?.lqip || imageBlurDataURL}
              priority={true} // LCP image
            />
          </Link>
        </div>
      ) : null}

      <div className={styles.featuredItemInfo}>
        <PageTitle>{item?.title}</PageTitle>

        {item?.overview ? <PortableText value={item?.overview} /> : null}

        <div className={styles.featuredItemMoreLink}>
          <MoreLink
            as={`/${urlPath}/${item?.slug}`}
            href={`/${urlPath}/[slug]`}
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
