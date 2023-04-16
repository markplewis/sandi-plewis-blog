import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import designTokens from "styles/design-tokens";
import { imageBlurDataURL } from "utils/images";

import styles from "components/homePage/RecentPostList.module.css";

// 3:2 aspect ratio
const imageWidth = 240;
const imageHeight = 160;

export default function RecentPostsList({ posts }) {
  const { breakpoints } = designTokens;

  return (
    <ul className={styles.recentPostList}>
      {posts.map(post => {
        const image = post?.image;

        return (
          <li key={`posts-${post?._id}-${post?.slug}`}>
            <Link
              className={styles.recentPostLink}
              as={`/posts/${post?.slug}`}
              href={`/posts/[slug]`}>
              {image ? (
                <Image
                  // Largest image size that we'll need
                  src={urlFor(image)
                    .width(imageWidth * 2)
                    .height(imageHeight * 2)
                    .quality(90)
                    .url()}
                  // `Image` component requires width and height to calculate aspect ratio.
                  // Because we're supplying these values, a CSS `aspect-ratio` isn't needed.
                  width={imageWidth}
                  height={imageHeight}
                  quality={90}
                  // The following media queries match the ones in the CSS file.
                  // Note: "The browser ignores everything after the first matching condition,
                  // so be careful how you order the media conditions."
                  // https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
                  sizes={[
                    `(min-width: ${breakpoints.w520.value}rem) and (max-width: ${breakpoints.w1149.value}rem) 120px`,
                    `(min-width: ${breakpoints.w480.value}rem) 83px`,
                    "240px"
                  ].join(",")}
                  alt={image?.alt}
                  placeholder="blur"
                  blurDataURL={image?.lqip || imageBlurDataURL}
                  className={styles.recentPostImage}
                />
              ) : null}
              <div className={styles.recentPostInfo}>
                <h3 className={styles.recentPostTitle}>{post?.title || post?.name}</h3>
                <p className={styles.recentPostDescription}>{post?.description}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
