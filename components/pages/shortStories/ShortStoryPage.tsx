import BasicImage from "~/components/BasicImage";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import InternalLink from "~/components/portableText/InternalLink";
import PageBody from "~/components/PageBody";
import ShareTools from "~/components/ShareTools";
import { PortableText } from "~/lib/sanity";
import designTokens from "~/styles/design-tokens";
import type { PageColorsAndStyles } from "~/utils/queries/shared";
import type { ShortStory } from "~/utils/queries/shortStories";

// Shared styles
import styles from "~/components/pages/novels/NovelPage.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function ShortStoryPage({ data }: { data: ShortStory }) {
  const {
    title = "",
    description = "",
    overview = [],
    body = [],
    image = {},
    pageColorsAndStyles = {}
  } = data;

  const { colors: pageColors, styles: pageStyles } = pageColorsAndStyles as PageColorsAndStyles;
  const { breakpoints } = designTokens;

  const overviewText = overview ? (
    <PortableText value={overview} components={portableTextComponents} />
  ) : null;

  const overviewItems = (
    <>
      <PageTitle className={styles.title}>{title}</PageTitle>
      {overviewText}
    </>
  );

  const imageWidth = 300;
  const imageHeight = image?.asset?.aspectRatio
    ? Math.round(imageWidth / image.asset.aspectRatio)
    : imageWidth;

  return (
    <Layout
      title={title}
      description={description}
      pageColors={pageColors}
      imageProps={{ image, portrait: true, crop: false }}>
      <style jsx global>
        {`
          ${pageStyles}
        `}
      </style>

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
              width={imageWidth}
              height={imageHeight}
              sizes={[`(min-width: ${breakpoints.w340.value}rem) 300px`, "90vw"].join(",")}
              alt={image?.alt}
              blur={image?.asset?.lqip}
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

        {body ? <PageBody content={body} pageColors={pageColors} /> : null}
      </div>
    </Layout>
  );
}
