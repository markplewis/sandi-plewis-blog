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
import useMediaQuery from "utils/useMediaQuery";

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

  const { colors: pageColorData, styles: pageStyles } = pageColors;

  const { breakpoints } = designTokens;
  const isWide = useMediaQuery(`(min-width: ${breakpoints.w1024.value}rem)`);
  const isMedium = useMediaQuery(`(min-width: ${breakpoints.w768.value}rem)`);

  // 12:9 (Cinemascope) vs 3:2 (Classic Film)
  const cinemaRatio = isWide || !isMedium;
  const imageSize = {
    width: cinemaRatio ? 1240 : 1000,
    height: cinemaRatio ? 531 : 667
  };

  const creditLine = processCreditLine(image?.creditLine);

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
          {/* Visible from isMedium */}
          <div className={styles.shareToolsAbove}>
            <ShareTools text={title} />
          </div>
        </div>

        <div className={styles.hero}>
          <div className={styles.image}>
            {image ? (
              <Image
                src={urlFor(image)
                  .width(imageSize.width * 2)
                  .height(imageSize.height * 2)
                  .url()}
                width={imageSize.width}
                height={imageSize.height}
                sizes={`(max-width: ${breakpoints.w800.value}rem) 100vw, 800px`}
                alt={image?.alt}
                placeholder="blur"
                blurDataURL={image?.lqip || imageBlurDataURL}
                className={styles.img}
              />
            ) : null}
          </div>

          {/* Visible from isMedium */}
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

        {/* Visible until isMedium */}
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
