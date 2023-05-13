import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import util from "util";
import HomePage from "~/components/pages/home/HomePage";
import { runQuery } from "~/lib/sanity.client";
import { getPageColorsAndStyles } from "~/utils/color";
import { homePageItemsQuery, recentPostsQuery, type HomePageData } from "~/utils/queries/homePage";

const HomePagePreview = lazy(() => import("~/components/pages/home/HomePagePreview"));

export default function Home({
  preview = false,
  previewData,
  data
}: {
  preview: boolean;
  previewData: string;
  data: HomePageData;
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <HomePagePreview token={previewData} />
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
    homePage: homePageItemsQuery.schema.parse(await runQuery(homePageItemsQuery)),
    posts: recentPostsQuery.schema.parse(await runQuery(recentPostsQuery))
  };
  // Append adjusted page colors
  if (data?.homePage?.novel?.image?.sampledColors) {
    data.homePage.pageColorsAndStyles = getPageColorsAndStyles(
      data.homePage.novel.image.sampledColors
    );
  }
  console.log("homePageQuery", util.inspect(data, false, 5));

  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
