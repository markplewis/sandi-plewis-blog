import { GetStaticProps } from 'next'
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import WritingPage from "~/components/pages/writing/WritingPage";
import { client } from "~/lib/sanity.client";
import { novelsQuery, shortStoriesQuery } from "~/utils/queries/writing";

const WritingPagePreview = lazy(() => import("~/components/pages/writing/WritingPagePreview"));

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
export const getStaticProps: GetStaticProps = async ({ preview = false, previewData = {} }) => {
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
