import Image from "next/image";
import Link from "next/link";
import MoreLink from "components/MoreLink";
import PageTitle from "components/global/PageTitle";
import InternalLink from "components/portableText/InternalLink";
import { PortableText, urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";

import styles from "components/homePage/FeaturedNovel.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

// 9:14 aspect ratio
const imageWidth = 280;
const imageHeight = 436;

export default function FeaturedNovel({ novel }) {
  const imageUrl = novel?.image;

  return (
    <div className={styles.featuredNovel}>
      {imageUrl ? (
        <div className={styles.featuredNovelImage}>
          <Link as={`/novels/${novel?.slug}`} href="/novels/[slug]">
            <Image
              src={urlFor(imageUrl)
                .width(imageWidth * 2)
                .height(imageHeight * 2)
                .url()}
              width={imageWidth}
              height={imageHeight}
              alt={novel?.image?.alt || novel?.title}
              placeholder="blur"
              blurDataURL={novel?.image?.lqip || imageBlurDataURL}
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
