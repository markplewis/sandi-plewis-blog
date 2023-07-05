import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import PageBody from "~/components/PageBody";
import PostMeta from "~/components/PostMeta";
import ShareTools from "~/components/ShareTools";
import { urlFor } from "~/lib/sanity";
import designTokens from "~/styles/design-tokens";
import { getPageColorsAndStyles } from "~/utils/color";
import { imageBlurDataURL } from "~/utils/images";
import { processCreditLine } from "~/utils/strings";
import type { Post } from "~/utils/queries/posts";
import type { ImageData, PageColorsAndStyles } from "~/utils/queries/shared";

import styles from "~/components/pages/posts/PostPage.module.css";

export default function PostPage({ data }: { data: Post }) {
  // Append adjusted page colors
  if (data?.image?.sampledColors) {
    data.pageColorsAndStyles = getPageColorsAndStyles(data.image.sampledColors);
  }
  // console.log("post data", util.inspect(data, false, 5));
  const { title = "", description = "", pageColorsAndStyles = {} } = data;
  const body = data.body as PortableTextBlock[];
  const image = data.image as ImageData;
  const { colors: pageColors, styles: pageStyles } = pageColorsAndStyles as PageColorsAndStyles;
  const creditLine = processCreditLine(image?.asset?.creditLine || "");
  const { breakpoints } = designTokens;

  // Fixed 5:2 aspect ratio
  const imageWidth = 1240;
  const imageHeight = 496;

  return (
    <Layout
      title={title}
      description={description}
      pageColors={pageColors}
      imageProps={{ image, portrait: false, cropped: true }}>
      {/* See: https://github.com/vercel/styled-jsx/issues/710 */}
      <style jsx global>
        {`
          ${pageStyles}
        `}
      </style>

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
              {image?.asset ? (
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
                    .quality(90)
                    .url()}
                  quality={90}
                  fill={true}
                  sizes={[
                    `(min-width: ${breakpoints.w1720.value}rem) 694px`,
                    `(min-width: ${breakpoints.w768.value}rem) 40vw`,
                    "90vw"
                  ].join(",")}
                  alt={image?.alt || ""}
                  placeholder="blur"
                  blurDataURL={image?.asset?.lqip || imageBlurDataURL}
                  className={styles.img}
                  priority={true} // LCP image
                />
              ) : null}
            </div>
          </div>

          {/* Hidden at some breakpoints */}
          <div className={styles.metaAbove}>
            <PostMeta post={data} creditLine={creditLine} themed={true} />
          </div>
        </div>

        {/* Hidden at some breakpoints */}
        <div className={styles.shareToolsBelow}>{<ShareTools text={title} align="center" />}</div>
        <div className={styles.metaBelow}>
          <PostMeta post={data} creditLine={creditLine} themed={false} />
        </div>

        <PageBody content={body} pageColors={pageColors} />
      </article>
    </Layout>
  );
}
