import CoverImage from "components/CoverImage";
import InternalLink from "components/portableText/InternalLink";
import PostBody from "components/PostBody";
import ReviewList from "components/ReviewList";
// import ColorSwatches from "components/global/ColorSwatches";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import ShareTools from "components/global/ShareTools";
import { PortableText } from "lib/sanity";
import designTokens from "styles/design-tokens";
import useMediaQuery from "utils/useMediaQuery";

import styles from "styles/layouts/writing.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function NovelPage({ data }) {
  const {
    title = "",
    description = "",
    overview = [],
    body = [],
    image = {},
    pageColors = {},
    reviews = []
  } = data;

  const { styles: pageStyles } = pageColors;

  const { breakpoints } = designTokens;
  const isWide = useMediaQuery(`(min-width: ${breakpoints.w1024.value}rem)`);
  const isMedium = useMediaQuery(`(min-width: ${breakpoints.w768.value}rem)`);

  const overviewText = overview ? (
    <PortableText value={overview} components={portableTextComponents} />
  ) : null;

  const overviewItems = (
    <>
      <PageTitle className={styles.title}>{title}</PageTitle>
      {/* <ColorSwatches /> */}
      {overviewText}
    </>
  );

  return (
    <Layout title={title} description={description} image={{ image, portrait: true, crop: false }}>
      {pageStyles ? (
        <style jsx global>
          {`
            ${pageStyles}
          `}
        </style>
      ) : null}

      {/* <div className={styles.pageWrapper}> */}
      <div className={styles.heroArea}>
        <div className={styles.coverImageAndInfo}>
          <CoverImage
            className={styles.coverImage}
            image={image}
            title={title}
            width={376}
            height={600}
          />
          {isMedium && <div className={`${styles.info} ${styles.infoAbove}`}>{overviewItems}</div>}
          {isWide && <ShareTools text={title} position="vertical" />}
        </div>
      </div>

      <div className={styles.bodyArea}>
        {!isWide && (
          <div className={styles.shareToolsBelow}>
            <ShareTools text={title} align="right" />
          </div>
        )}
        {!isMedium && <div className={`${styles.info} ${styles.infoBelow}`}>{overviewItems}</div>}

        {body ? <PostBody content={body} /> : null}

        {reviews?.length ? (
          <div className={styles.reviews}>
            <h2 className={styles.reviewsHeading}>Reviews</h2>
            <ReviewList reviews={reviews} as="h3" />
          </div>
        ) : null}
      </div>
      {/* </div> */}
    </Layout>
  );
}
