import Image from "next/image";
import Link from "next/link";
import DisplayDate from "components/global/DisplayDate";
import { urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";

import styles from "components/CardList.module.css";

// 2:3 aspect ratio
const imageWidth = 120;
const imageHeight = 180;

export default function CardList({ items = [], path = "posts", showDate = true }) {
  return (
    <ul className={styles.cardList}>
      {items.map(item => {
        const slug = item?.slug;
        const date = item?.date;
        const image = item?.image;

        return (
          <li key={`${path}-${item?._id}-${slug}`}>
            <Link className={styles.cardLink} as={`/${path}/${slug}`} href={`/${path}/[slug]`}>
              {image ? (
                <div className={styles.cardImage}>
                  <Image
                    src={urlFor(image)
                      .width(imageWidth * 2)
                      .height(imageHeight * 2)
                      .quality(90)
                      .url()}
                    width={imageWidth}
                    height={imageHeight}
                    quality={90}
                    alt={image?.alt}
                    placeholder="blur"
                    blurDataURL={image?.lqip || imageBlurDataURL}
                  />
                </div>
              ) : null}

              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{item?.title || item?.name}</h3>
                {showDate && date ? (
                  <p>
                    <DisplayDate dateString={date} />
                  </p>
                ) : null}
                <p className={styles.cardDescription}>{item?.description}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
