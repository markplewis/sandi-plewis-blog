import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
// import util from "util";
import WritingPage from "~/components/pages/writing/WritingPage";
import { runQuery } from "~/lib/sanity.client";
import { novelsQuery } from "~/utils/queries/novels";
import { shortStoriesQuery } from "~/utils/queries/shortStories";
import type { NovelsAndShortStories } from "~/utils/queries/shared";

const WritingPagePreview = lazy(() => import("~/components/pages/writing/WritingPagePreview"));

export default function Writing({
  preview = false,
  previewData,
  data
}: {
  preview: boolean;
  previewData: string;
  data: NovelsAndShortStories;
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <WritingPagePreview token={previewData} />
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
  if (preview && previewData) {
    return {
      props: {
        preview,
        previewData
      }
    };
  }
  const data = {
    novels: novelsQuery.schema.parse(await runQuery(novelsQuery)),
    shortStories: shortStoriesQuery.schema.parse(await runQuery(shortStoriesQuery))
  };
  // console.log("writing data", util.inspect(data, false, 5));

  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
