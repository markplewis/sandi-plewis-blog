"use client";

import { HomePage } from "components/pages/HomePage";
import { usePreview } from "lib/sanity.preview";
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
  return <HomePage data={data} />;
}
