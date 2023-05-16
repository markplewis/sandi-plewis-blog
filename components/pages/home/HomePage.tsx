import Layout from "~/components/Layout";
import ShareTools from "~/components/ShareTools";
import AuthorBio from "~/components/homePage/AuthorBio";
import FeaturedNovel from "~/components/homePage/FeaturedNovel";
import FeaturedReviews from "~/components/homePage/FeaturedReviews";
import RecentPosts from "~/components/homePage/RecentPosts";
import type { HomePageData } from "~/utils/queries/homePage";
import type { Review } from "~/utils/queries/reviews";
import type { ImageData, PageColorsAndStyles } from "~/utils/queries/shared";

import styles from "~/components/pages/home/HomePage.module.css";

export default function HomePage({ data }: { data: HomePageData }) {
  const { homePage, posts = [] } = data;
  const { author, novel, description, pageColorsAndStyles } = homePage;
  const image = author?.image as ImageData;
  const { colors: pageColors, styles: pageStyles } = pageColorsAndStyles as PageColorsAndStyles;
  const reviews: Review[] = homePage?.reviews;

  return (
    <Layout
      title=""
      description={description}
      pageColors={pageColors}
      imageProps={{ image, portrait: true, cropped: true }}>
      <style jsx global>
        {`
          ${pageStyles}
        `}
      </style>
      <div
        className={styles.patternBlock}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg' fill='white' fill-opacity='0.3' fill-rule='evenodd' clip-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2'%3E%3Cpath d='M4 0h2L0 6V4l4-4zM6 4v2H4l2-2z'/%3E%3C/svg%3E")`
        }}></div>

      <div className={styles.page}>
        <div className={styles.shareToolsHorizontal}>
          <ShareTools text="Sandi Plewis, Author/Editor" align="right" />
        </div>

        <section className={styles.row1}>
          {novel ? (
            <div>
              <FeaturedNovel novel={novel} />
              <div className={styles.shareToolsFeaturedNovel}>
                <ShareTools text="Sandi Plewis, Author/Editor" align="center" />
              </div>
            </div>
          ) : null}

          {reviews.length ? <FeaturedReviews reviews={reviews} /> : null}

          <div className={styles.shareToolsVertical}>
            <ShareTools text="Sandi Plewis, Author/Editor" position="vertical" />
          </div>
        </section>

        <div className={styles.row2}>
          {posts.length ? <RecentPosts posts={posts} /> : null}
          {author ? <AuthorBio author={author} /> : null}
        </div>
      </div>
    </Layout>
  );
}
