import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { WritingPage } from "components/pages/WritingPage";
import { client } from "lib/sanity.client";
import { novelsQuery, shortStoriesQuery } from "utils/queries/writingPageQueries";

const WritingPagePreview = lazy(() => import("components/pages/WritingPagePreview"));

export default function Writing({ preview, token, data }) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <WritingPagePreview token={token} />
    </PreviewSuspense>
  ) : (
    <WritingPage data={data} />
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
  const novels = await client.fetch(novelsQuery);
  const shortStories = await client.fetch(shortStoriesQuery);
  return {
    props: {
      preview,
      data: {
        novels,
        shortStories
      }
    },
    revalidate: 10
  };
};
