import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import HomePage from "~/components/pages/home/HomePage";
import PreviewProvider from "~/components/PreviewProvider";
import { runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { homePageItemsQuery, recentPostsQuery, type HomePageData } from "~/utils/queries/homePage";

const HomePagePreview = dynamic(() => import("~/components/pages/home/HomePagePreview"));

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  const data = {
    homePage: homePageItemsQuery.schema.parse(
      await runQuery(homePageItemsQuery, context.params, preview)
    ),
    posts: recentPostsQuery.schema.parse(await runQuery(recentPostsQuery, context.params, preview))
  };
  // console.log("home page data", util.inspect(data, false, 5));
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    revalidate: 10
  };
};

export default function Home({
  data,
  previewMode,
  previewToken
}: {
  data: HomePageData;
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <HomePagePreview data={data} />
    </PreviewProvider>
  ) : (
    <HomePage data={data} />
  );
}
