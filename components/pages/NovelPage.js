import BasicImage from "components/BasicImage";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import ShareTools from "components/global/ShareTools";
import InternalLink from "components/portableText/InternalLink";
import PostBody from "components/PostBody";
import ReviewList from "components/ReviewList";
import { PortableText } from "lib/sanity";

import styles from "components/pages/NovelOrShortStoryPage.module.css";

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

  const overviewText = overview ? (
    <PortableText value={overview} components={portableTextComponents} />
  ) : null;

  const overviewItems = (
    <>
      <PageTitle className={styles.title}>{title}</PageTitle>
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

      <div className={styles.heroArea}>
        <div
          className={styles.patternBlock1}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg' fill='white' fill-opacity='0.3' fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2'%3E%3Cpath d='M4 0h2L0 6V4l4-4zM6 4v2H4l2-2z'/%3E%3C/svg%3E")`
          }}></div>

        <div className={styles.coverImageAndInfo}>
          <div className={styles.coverImage}>
            <BasicImage
              image={image}
              // 9:14 aspect ratio
              width={300}
              height={467}
              alt={image?.alt}
              blur={image?.lqip}
            />
          </div>

          <div className={`${styles.info} ${styles.infoAbove}`}>
            {overviewItems}
            <div className={styles.shareToolsHorizontal}>
              <ShareTools
                text={title}
                position="horizontal"
                color="primary"
                align="right"
                border={true}
              />
            </div>
          </div>

          <div className={styles.shareToolsVertical}>
            <ShareTools text={title} position="vertical" color="primary" border={true} />
          </div>
        </div>

        <div
          className={styles.patternBlock2}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
      </div>

      <div className={styles.bodyArea}>
        <div className={`${styles.info} ${styles.infoBelow}`}>
          {overviewItems}
          <div className={styles.shareToolsBelow}>
            <ShareTools text={title} align="right" color="primary" />
          </div>
        </div>

        {body ? <PostBody content={body} /> : null}

        {reviews?.length ? (
          <div className={styles.reviews}>
            <h2 className={styles.reviewsHeading}>Reviews</h2>
            <ReviewList reviews={reviews} as="h3" />
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
