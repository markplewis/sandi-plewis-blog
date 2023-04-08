import Image from "next/image";
import Link from "next/link";
import DisplayDate from "components/global/DisplayDate";
import { urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";
import useMediaQuery from "utils/useMediaQuery";
import designTokens from "styles/design-tokens";

import styles from "components/CardList.module.css";

const sizes = {
  mobile: {
    width: 240,
    // Possible heights
    // 3:2 aspect ratio for landscape, 9:14 for portrait
    landscape: 160,
    portrait: 374
  },
  small: {
    width: 83,
    landscape: 55,
    portrait: 129
  },
  large: {
    width: 120,
    landscape: 80,
    portrait: 187
  }
};

export default function CardList({ items = [], path = "posts", showDate = true }) {
  const { breakpoints } = designTokens;
  const isNarrow = useMediaQuery(`(min-width: ${breakpoints.w480.value}rem)`);
  const isMedium = useMediaQuery(
    `(min-width: ${breakpoints.w520.value}rem) and (max-width: ${breakpoints.w1150.value - 0.1}rem)`
  );
  const isWide = useMediaQuery(`(min-width: ${breakpoints.w1280.value}rem)`);

  const largeCardImages = isMedium || isWide;
  const imageSize = !isNarrow ? sizes.mobile : sizes[largeCardImages ? "large" : "small"];
  const imageWidth = imageSize.width;
  const imageHeight = imageSize.landscape;

  return (
    <ul className={`${styles.cardList} ${styles.cardListPadded}`}>
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
