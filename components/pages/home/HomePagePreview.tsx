"use client";

import HomePage from "~/components/pages/home/HomePage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColorsAndStyles } from "~/utils/color";
import { homePageItemsQuery, recentPostsQuery, type HomePageData } from "~/utils/queries/homePage";

export default function HomePagePreview({ token }: { token: string }) {
  const data: HomePageData = {
    homePage: usePreview(token, homePageItemsQuery.query),
    posts: usePreview(token, recentPostsQuery.query)
  };
  if (data?.homePage?.novel?.image?.sampledColors) {
    // Append adjusted page colors
    data.homePage.pageColorsAndStyles = getPageColorsAndStyles(
      data.homePage.novel.image.sampledColors
    );
  }
  return <HomePage data={data} />;
}
