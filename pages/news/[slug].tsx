import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";
import NewsItemPage from "~/components/pages/newsItems/NewsItemPage";
import PreviewProvider from "~/components/PreviewProvider";
import { getClient, runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { newsItemQuery, type NewsItem } from "~/utils/queries/newsItems";

const NewsItemPagePreview = dynamic(
  () => import("~/components/pages/newsItems/NewsItemPagePreview")
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getClient().fetch(
    groq`*[_type == "newsItem" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
};

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  let data;
  try {
    data = newsItemQuery.schema.parse(await runQuery(newsItemQuery, context.params, preview));
    // console.log("newsItem data", util.inspect(data, false, 5));
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    notFound: !data,
    revalidate: 10
  };
};

export default function NewsItem({
  data,
  previewMode,
  previewToken
}: {
  data: NewsItem;
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <NewsItemPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <NewsItemPage data={data} />
  );
}
