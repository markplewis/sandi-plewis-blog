import Image from "next/image";
import Link from "next/link";
import ColorSwatches from "components/global/ColorSwatches";
import DisplayDate from "components/global/DisplayDate";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import ShareTools from "components/global/ShareTools";
import { urlFor } from "lib/sanity";
import PostBody from "components/PostBody";
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

  const { styles: pageStyles } = pageColors;

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
          {isMedium && <ShareTools text={title} />}
        </div>

        <div className={styles.hero}>
          <div className={styles.image}>
            {image ? (
              <Image
                src={urlFor(image).width(imageSize.width).height(imageSize.height).url()}
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

          {!isMedium && <ShareTools text={title} align="right" />}

          <div className={styles.meta}>
            <p>
              <DisplayDate dateString={date} />
            </p>
            <p>
              <Link as={`/authors/${author?.slug}`} href="/authors/[slug]">
                {author?.name}
              </Link>
            </p>

            {categories && categories.length ? (
              <div>
                <p>{categories.length > 1 ? "Categories:" : "Category:"}</p>
                <ul>
                  {categories.map(({ slug, title }) => (
                    <li key={slug}>
                      <Link as={`/categories/${slug}`} href="/categories/[slug]">
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {creditLine && <p dangerouslySetInnerHTML={{ __html: `Photo: ${creditLine}` }} />}
          </div>
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
