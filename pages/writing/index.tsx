import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import WritingPage from "~/components/pages/writing/WritingPage";
import PreviewProvider from "~/components/PreviewProvider";
import { runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { novelsQuery } from "~/utils/queries/novels";
import { shortStoriesQuery } from "~/utils/queries/shortStories";
import type { NovelsAndShortStories } from "~/utils/queries/shared";

const WritingPagePreview = dynamic(() => import("~/components/pages/writing/WritingPagePreview"));

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  const data = {
    novels: novelsQuery.schema.parse(await runQuery(novelsQuery, context.params, preview)),
    shortStories: shortStoriesQuery.schema.parse(
      await runQuery(shortStoriesQuery, context.params, preview)
    )
  };
  // console.log("writing data", util.inspect(data, false, 5));
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    revalidate: 10
  };
};

export default function Writing({
  data,
  previewMode,
  previewToken
}: {
  data: NovelsAndShortStories;
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <WritingPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <WritingPage data={data} />
  );
}
