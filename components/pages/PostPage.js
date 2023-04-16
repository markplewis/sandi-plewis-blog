import Image from "next/image";
import ColorSwatches from "components/global/ColorSwatches";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import ShareTools from "components/global/ShareTools";
import { urlFor } from "lib/sanity";
import PostBody from "components/PostBody";
import PostMeta from "components/PostMeta";
import designTokens from "styles/design-tokens";
import { imageBlurDataURL } from "utils/images";
import { processCreditLine } from "utils/strings";

import styles from "styles/layouts/post.module.css";

export default function PostPage({ data }) {
  const {
    title = "",
    body = [],
    description = "",
    date = "",
    categories = [],
    author = {},
    image = {},
    pageColors = {}
  } = data;

  const { breakpoints } = designTokens;
  const { colors: pageColorData, styles: pageStyles } = pageColors;
  const creditLine = processCreditLine(image?.creditLine);

  // 5:2 aspect ratio
  const imageWidth = 1240;
  const imageHeight = 496;

  return (
    <Layout title={title} description={description} image={{ image, portrait: false, crop: true }}>
      {/* See: https://github.com/vercel/styled-jsx/issues/710 */}
      {pageStyles ? (
        <style jsx global>
          {`
            ${pageStyles}
          `}
        </style>
      ) : null}

      <article>
        <div className={styles.titleArea}>
          <PageTitle className={styles.title}>{title}</PageTitle>

          {/* Hidden at some breakpoints */}
          <div className={styles.shareToolsAbove}>
            <ShareTools text={title} />
          </div>
        </div>

        <div className={styles.hero}>
          <div className={styles.image}>
            <div className={styles.imageInner}>
              {image ? (
                // Ideally, I'd use a `<picture>` element with a dedicated `<source>` for each
                // image ratio (5:2 vs 3:2). Unfortunately, Next.js' `Image` component isn't
                // able to render `<picture>` elements and doesn't support art direction use cases
                // (see: https://github.com/vercel/next.js/discussions/25393). I could use a native
                // HTML `<picture>` element instead, but then I'd have to generate all of the
                // `srcset` images manually (via `urlFor()`) and I'd miss out on the optimizations
                // that the `Image` component provides. Alternatively, I could render two separate
                // `Image` components and hide one via CSS, but then the browser may end up
                // downloading both of them when only one will appear. This is increasingly likely
                // given that I'm using the `Image` component's `priority' prop. So, since I'm using
                // `object-fit: cover` with the `Image` component's `fill` prop, and it doesn't
                // matter too much if part of the image gets cropped off in some cases, I've decided
                // to render only one image and allow the browser to scale it to fill its container.
                <Image
                  src={urlFor(image)
                    .width(imageWidth * 2)
                    .height(imageHeight * 2)
                    .url()}
                  fill={true}
                  sizes={[
                    `(min-width: ${breakpoints.w1024.value}rem) 700px`, // 502px to 700px wide
                    `(min-width: ${breakpoints.w768.value}rem) 450px`, // 324px to 451px wide
                    "90vw"
                  ].join(",")}
                  alt={image?.alt}
                  placeholder="blur"
                  blurDataURL={image?.lqip || imageBlurDataURL}
                  className={styles.img}
                  priority={true} // LCP image
                />
              ) : null}
            </div>
          </div>

          {/* Hidden at some breakpoints */}
          <div className={styles.metaAbove}>
            <PostMeta
              author={author}
              categories={categories}
              creditLine={creditLine}
              date={date}
              themed={true}
              pageColorData={pageColorData}
            />
          </div>
        </div>

        {/* Hidden at some breakpoints */}
        <div className={styles.shareToolsBelow}>{<ShareTools text={title} align="right" />}</div>
        <div className={styles.metaBelow}>
          <PostMeta
            author={author}
            categories={categories}
            creditLine={creditLine}
            date={date}
            themed={false}
            pageColorData={pageColorData}
          />
        </div>

        {body ? (
          <PostBody content={body}>
            <ColorSwatches />
          </PostBody>
        ) : (
          <ColorSwatches />
        )}
      </article>
    </Layout>
  );
}
