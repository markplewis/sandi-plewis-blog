"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import HomePage from "~/components/pages/home/HomePage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { homePageItemsQuery, recentPostsQuery, type HomePageData } from "~/utils/queries/homePage";

export default function HomePagePreview({ data: initialData }: { data: HomePageData }) {
  const params = useRouter().query;
  const { homePage, posts } = initialData;
  const [homePageData, homePageLoading] = useLiveQuery(homePage, homePageItemsQuery.query, params);
  const [postsData, postsLoading] = useLiveQuery(posts, recentPostsQuery.query, params);
  const data = {
    homePage: homePageData,
    posts: postsData
  };
  return (
    <>
      {homePageLoading || postsLoading ? <PreviewLoadingMessage /> : null}
      <HomePage data={data} />
    </>
  );
}
