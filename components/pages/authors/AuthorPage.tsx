import type { PortableTextBlock } from "@portabletext/types";
import BasicImage from "~/components/BasicImage";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import PageBody from "~/components/PageBody";
import type { Author } from "~/utils/queries/authors";
import type { ImageData, PageColorsAndStyles } from "~/utils/queries/shared";
import useDebug from "~/utils/useDebug";

import styles from "~/components/pages/authors/AuthorPage.module.css";

// Fixed 1:1 aspect ratio
const imageWidth = 376;
const imageHeight = imageWidth;

export default function AuthorPage({ data }: { data: Author }) {
  const { description, pageColorsAndStyles } = data;
  const authorName = data?.title;
  const biography = data.biography as PortableTextBlock[];
  const image = data.image as ImageData;
  const { colors: pageColors, styles: pageStyles } = pageColorsAndStyles as PageColorsAndStyles;
  const debug = useDebug();

  const pageColorsSecondary = pageColors?.secondary;
  const patternBlockFill = pageColorsSecondary
    ? `rgb(${pageColorsSecondary.r}% ${pageColorsSecondary.g}% ${pageColorsSecondary.b}%)`
    : "black";

  debug && console.log("AuthorPage:image", image);

  return (
    <Layout
      title={authorName}
      description={description}
      pageColors={pageColors}
      imageProps={{ image, portrait: true, cropped: true }}>
      <style jsx global>
        {`
          ${pageStyles}
        `}
      </style>
      <div className={styles.heroArea}>
        <div className={styles.patternBlock}>
          <div
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${patternBlockFill}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}></div>
        </div>

        <div className={styles.coverImage}>
          <BasicImage
            image={image}
            width={imageWidth}
            height={imageHeight}
            alt={image?.alt || authorName}
            blur={image?.asset?.lqip}
          />
        </div>
      </div>

      <div className={styles.titleContainer}>
        <PageTitle className={styles.title}>{authorName}</PageTitle>
      </div>

      <div className={styles.bodyArea}>
        <PageBody content={biography} pageColors={pageColors} />
      </div>
    </Layout>
  );
}
