import Layout from "components/global/Layout";
import ShareTools from "components/global/ShareTools";
import AuthorBio from "components/homePage/AuthorBio";
import FeaturedNovel from "components/homePage/FeaturedNovel";
import FeaturedNovelReviews from "components/homePage/FeaturedNovelReviews";
import RecentPosts from "components/homePage/RecentPosts";
import designTokens from "styles/design-tokens";
import useMediaQuery from "utils/useMediaQuery";

import styles from "styles/pages/home.module.css";

export default function HomePage({ data }) {
  const { breakpoints } = designTokens;
  const { novelAndHomePage, reviews = [], posts = [], author } = data;
  const { novel, description } = novelAndHomePage;
  const isWide = useMediaQuery(`(min-width: ${breakpoints.w1280.value}rem)`);

  return (
    <Layout
      title=""
      description={description}
      image={{ image: author?.image, portrait: true, crop: true }}>
      <div className={styles.page}>
        {isWide ? null : <ShareTools text="Sandi Plewis, Author/Editor" align="right" />}

        <div
          className={styles.patternBlock}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg' fill='%23000000' fill-opacity='0.6' fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2'%3E%3Cpath d='M4 0h2L0 6V4l4-4zM6 4v2H4l2-2z'/%3E%3C/svg%3E")`
          }}></div>

        <section className={styles.row1}>
          {novel ? (
            <div className={styles.item}>
              <FeaturedNovel novel={novel} />
            </div>
          ) : null}

          {reviews.length ? (
            <div className={styles.item}>
              <FeaturedNovelReviews reviews={reviews} />
            </div>
          ) : null}

          {isWide ? <ShareTools text="Sandi Plewis, Author/Editor" position="vertical" /> : null}
        </section>

        <div className={styles.row2}>
          {posts.length ? (
            <section className={styles.item}>
              <RecentPosts posts={posts} />
            </section>
          ) : null}

          {author ? (
            <section className={styles.item}>
              <AuthorBio author={author} />
            </section>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
