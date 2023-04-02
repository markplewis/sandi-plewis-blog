import Layout from "components/global/Layout";
import ShareTools from "components/global/ShareTools";
import AuthorBio from "components/homePage/AuthorBio";
import FeaturedNovel from "components/homePage/FeaturedNovel";
import FeaturedReviews from "components/homePage/FeaturedReviews";
import RecentPosts from "components/homePage/RecentPosts";
import designTokens from "styles/design-tokens";
import useMediaQuery from "utils/useMediaQuery";

import styles from "styles/layouts/home.module.css";

export default function HomePage({ data }) {
  const { breakpoints } = designTokens;
  const { novelAndHomePage, reviews = [], posts = [], author, pageColors = {} } = data;
  const { novel, description } = novelAndHomePage;
  const { styles: pageStyles } = pageColors;

  const pageColorsSecondary = pageColors?.colors?.secondary;
  const patternBlockFill = pageColorsSecondary
    ? `rgb(${pageColorsSecondary.r}% ${pageColorsSecondary.g}% ${pageColorsSecondary.b}%)`
    : "black";

  // TODO: refactor this to use CSS `display: none` instead of conditionally rendering
  const isWide = useMediaQuery(`(min-width: ${breakpoints.w1280.value}rem)`);

  return (
    <Layout
      title=""
      description={description}
      image={{ image: author?.image, portrait: true, crop: true }}>
      {pageStyles ? (
        <style jsx global>
          {`
            ${pageStyles}
          `}
        </style>
      ) : null}

      <div className={styles.page}>
        {isWide ? null : <ShareTools text="Sandi Plewis, Author/Editor" align="right" />}

        <div
          className={styles.patternBlock}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg' fill='${patternBlockFill}' fill-opacity='0.6' fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2'%3E%3Cpath d='M4 0h2L0 6V4l4-4zM6 4v2H4l2-2z'/%3E%3C/svg%3E")`
          }}></div>

        <section className={styles.row1}>
          {novel ? <FeaturedNovel novel={novel} /> : null}
          {reviews.length ? <FeaturedReviews reviews={reviews} /> : null}
          {isWide ? <ShareTools text="Sandi Plewis, Author/Editor" position="vertical" /> : null}
        </section>

        <div className={styles.row2}>
          {posts.length ? <RecentPosts posts={posts} /> : null}
          {author ? <AuthorBio author={author} /> : null}
        </div>
      </div>
    </Layout>
  );
}
