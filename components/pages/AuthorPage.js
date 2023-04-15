import CoverImage from "components/CoverImage";
import ColorSwatches from "components/global/ColorSwatches";
import PostBody from "components/PostBody";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

import styles from "styles/layouts/author.module.css";

export default function AuthorPage({ data }) {
  const { name = "", description = "", biography = "", image = {}, pageColors = {} } = data;
  const { styles: pageStyles } = pageColors;

  const pageColorsSecondary = pageColors?.colors?.secondary;
  const patternBlockFill = pageColorsSecondary
    ? `rgb(${pageColorsSecondary.r}% ${pageColorsSecondary.g}% ${pageColorsSecondary.b}%)`
    : "black";

  return (
    <Layout title={name} description={description} image={{ image, portrait: true, crop: true }}>
      {pageStyles ? (
        <style jsx global>
          {`
            ${pageStyles}
          `}
        </style>
      ) : null}

      <div className={styles.heroArea}>
        <div className={styles.patternBlock}>
          <div
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${patternBlockFill}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
            }}></div>
        </div>

        <CoverImage
          className={styles.coverImage}
          image={image}
          title={name}
          alt={image?.alt || name}
          // 1:1 aspect ratio
          width={376}
          height={376}
        />
      </div>

      <div className={styles.titleContainer}>
        <PageTitle className={styles.title}>{name}</PageTitle>
      </div>

      <div className={styles.bodyArea}>
        {biography ? (
          <PostBody content={biography}>
            <ColorSwatches />
          </PostBody>
        ) : (
          <ColorSwatches />
        )}
      </div>
    </Layout>
  );
}
