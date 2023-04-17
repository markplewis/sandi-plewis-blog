"use client";

import HomePage from "components/pages/home/HomePage";
import { usePreview } from "lib/sanity.preview";
import { getPageColors } from "utils/color";
import {
  featuredNovelAndHomePageQuery,
  featuredReviewsQuery,
  recentPostsQuery,
  authorBioQuery
} from "utils/queries/homePage";

export default function HomePagePreview({ token }) {
  const data = {
    novelAndHomePage: usePreview(token, featuredNovelAndHomePageQuery),
    reviews: usePreview(token, featuredReviewsQuery),
    posts: usePreview(token, recentPostsQuery),
    author: usePreview(token, authorBioQuery)
  };
  // Append adjusted page colors
  if (data?.novelAndHomePage) {
    data.pageColors = getPageColors(data.novelAndHomePage?.novel);
  }
  return <HomePage data={data} />;
}
