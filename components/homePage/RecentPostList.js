import Link from "next/link";
import RecentPostImage from "components/homePage/RecentPostImage";
import designTokens from "styles/design-tokens";

import styles from "components/homePage/RecentPostList.module.css";

const sizes = {
  mobile: {
    width: 240,
    // Possible heights
    // 3:2 aspect ratio for landscape, 9:14 for portrait
    landscape: 160
    // portrait: 374 (not used)
  },
  small: {
    width: 83,
    landscape: 55
    // portrait: 129 (not used)
  },
  large: {
    width: 120,
    landscape: 80
    // portrait: 187 (not used)
  }
};

export default function RecentPostsList({ posts }) {
  const { breakpoints } = designTokens;

  return (
    <ul className={styles.recentPostList}>
      {posts.map(post => {
        const imageUrl = post?.image;
        const imageAlt = post?.image?.alt;
        const imageBlur = post?.image?.lqip;
        const imageBreakpoint = breakpoints.w800.value;

        return (
          <li key={`posts-${post?._id}-${post?.slug}`}>
            <Link
              className={styles.recentPostLink}
              as={`/posts/${post?.slug}`}
              href={`/posts/[slug]`}>
              {post?.image ? (
                <>
                  <RecentPostImage
                    className={`${styles.recentPostImage} ${styles.recentPostImageMobile}`}
                    url={imageUrl}
                    width={sizes.mobile.width}
                    height={sizes.mobile.landscape}
                    sizes={`(max-width: ${imageBreakpoint}rem) 100vw, ${sizes.mobile.width}px`}
                    alt={imageAlt}
                    blur={imageBlur}
                  />
                  <RecentPostImage
                    className={`${styles.recentPostImage} ${styles.recentPostImageSmall}`}
                    url={imageUrl}
                    width={sizes.small.width}
                    height={sizes.small.landscape}
                    sizes={`(max-width: ${imageBreakpoint}rem) 100vw, ${sizes.small.width}px`}
                    alt={imageAlt}
                    blur={imageBlur}
                  />
                  <RecentPostImage
                    className={`${styles.recentPostImage} ${styles.recentPostImageLarge}`}
                    url={imageUrl}
                    width={sizes.large.width}
                    height={sizes.large.landscape}
                    sizes={`(max-width: ${imageBreakpoint}rem) 100vw, ${sizes.large.width}px`}
                    alt={imageAlt}
                    blur={imageBlur}
                  />
                </>
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
