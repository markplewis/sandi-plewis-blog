import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { imageBlurDataURL } from "utils/images";
import useMediaQuery from "utils/useMediaQuery";
import designTokens from "styles/design-tokens";

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

export default function RecentPosts({ posts }) {
  const { breakpoints } = designTokens;
  const isNarrow = useMediaQuery(`(min-width: ${breakpoints.w480.value}rem)`);
  const isMedium = useMediaQuery(
    `(min-width: ${breakpoints.w520.value}rem) and (max-width: ${breakpoints.w1150.value - 0.1}rem)`
  );
  const isWide = useMediaQuery(`(min-width: ${breakpoints.w1280.value}rem)`);

  const largePostImages = isMedium || isWide;
  const imageSize = !isNarrow ? sizes.mobile : sizes[largePostImages ? "large" : "small"];
  const imageWidth = imageSize.width;
  const imageHeight = imageSize.landscape;

  return (
    <>
      <h2>Recent posts</h2>
      <ul>
        {posts.map(post => (
          <li key={`posts-${post?._id}-${post?.slug}`}>
            <Link as={`/posts/${post?.slug}`} href={`/posts/[slug]`}>
              {post?.image ? (
                <div style={{ maxWidth: `${imageWidth}px` }}>
                  <Image
                    src={urlFor(post?.image)
                      .width(imageWidth * 2)
                      .height(imageHeight * 2)
                      .url()}
                    width={imageWidth}
                    height={imageHeight}
                    sizes={`(max-width: ${breakpoints.w800.value}rem) 100vw, ${imageWidth}px`}
                    alt={post?.image?.alt}
                    placeholder="blur"
                    blurDataURL={post?.image?.lqip || imageBlurDataURL}
                    className="responsive-image"
                  />
                </div>
              ) : null}
              <div>
                <h3>{post?.title || post?.name}</h3>
                <p>{post?.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link as={"/posts"} href="/posts">
          More posts
        </Link>
      </p>
    </>
  );
}
