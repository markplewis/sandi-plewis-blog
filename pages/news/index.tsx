import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import NewsItemsPage from "~/components/pages/newsItems/NewsItemsPage";
import PreviewProvider from "~/components/PreviewProvider";
import { runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { newsItemsQuery, type NewsItem } from "~/utils/queries/newsItems";

const NewsItemsPagePreview = dynamic(
  () => import("~/components/pages/newsItems/NewsItemsPagePreview")
);

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  let data;
  try {
    data = newsItemsQuery.schema.parse(await runQuery(newsItemsQuery, context.params, preview));
    // console.log("newsItems data", util.inspect(data, false, 5));
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    revalidate: 10
  };
};

export default function NewsItems({
  data,
  previewMode,
  previewToken
}: {
  data: NewsItem[];
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <NewsItemsPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <NewsItemsPage data={data} />
  );
}
