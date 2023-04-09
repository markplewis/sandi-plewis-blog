import Image from "next/image";
import Link from "next/link";
import DisplayDate from "components/global/DisplayDate";
import { urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";
import designTokens from "styles/design-tokens";

import styles from "components/CardList.module.css";

const imageWidth = 120;

// Possible heights (3:2 aspect ratio for landscape, 9:14 for portrait)
const imageHeights = {
  landscape: 80,
  portrait: 187
};

export default function CardList({
  items = [],
  path = "posts",
  showDate = true,
  orientation = "portrait" // "square", "landscape" or "portrait"
}) {
  const { breakpoints } = designTokens;
  const imageHeight = orientation === "square" ? imageWidth : imageHeights[orientation];

  return (
    <ul className={styles.cardList}>
      {items.map(item => (
        <li key={`${path}-${item?._id}-${item?.slug}`}>
          <Link className={styles.cardLink} as={`/${path}/${item?.slug}`} href={`/${path}/[slug]`}>
            {item?.image ? (
              <div className={styles.cardImage} style={{ maxWidth: `${imageWidth}px` }}>
                <Image
                  src={urlFor(item?.image)
                    .width(imageWidth * 2)
                    .height(imageHeight * 2)
                    .url()}
                  width={imageWidth}
                  height={imageHeight}
                  sizes={`(max-width: ${breakpoints.w800.value}rem) 100vw, ${imageWidth}px`}
                  alt={item?.image?.alt}
                  placeholder="blur"
                  blurDataURL={item?.image?.lqip || imageBlurDataURL}
                  className="responsive-image"
                />
              </div>
            ) : null}
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>{item?.title || item?.name}</h3>
              {showDate ? (
                <p>
                  <DisplayDate dateString={item?.date} />
                </p>
              ) : null}
              <p className={styles.cardDescription}>{item?.description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
