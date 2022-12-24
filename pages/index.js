import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { HomePage } from "components/pages/HomePage";
import { client } from "lib/sanity.client";
import {
  featuredNovelAndHomePageQuery,
  featuredReviewsQuery,
  recentPostsQuery,
  authorBioQuery
} from "utils/queries/homePageQueries";

const HomePagePreview = lazy(() => import("components/pages/HomePagePreview"));

export default function Home({ preview, token, data }) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <HomePagePreview token={token} />
    </PreviewSuspense>
  ) : (
    <HomePage data={data} />
  );
}

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps = async ({ preview = false, previewData = {} }) => {
  if (preview && previewData?.token) {
    return {
      props: {
        preview,
        token: previewData.token
      }
    };
  }
  const novelAndHomePage = await client.fetch(featuredNovelAndHomePageQuery);
  const reviews = await client.fetch(featuredReviewsQuery);
  const posts = await client.fetch(recentPostsQuery);
  const author = await client.fetch(authorBioQuery);
  return {
    props: {
      preview,
      data: {
        novelAndHomePage,
        reviews,
        posts,
        author
      }
    },
    revalidate: 10
  };
};
