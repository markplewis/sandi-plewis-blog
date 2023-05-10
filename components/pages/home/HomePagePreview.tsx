"use client";

import type { SanityDocument } from "@sanity/client";
import type { SPPages } from "~/types/pages.d";

import HomePage from "~/components/pages/home/HomePage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColors } from "~/utils/color";
import {
  featuredNovelAndHomePageQuery,
  featuredReviewsQuery,
  recentPostsQuery,
  authorBioQuery
} from "~/utils/queries/homePage";

export default function HomePagePreview({ token }: { token: string }) {
  const novelAndHomePage: SanityDocument = usePreview(token, featuredNovelAndHomePageQuery);

  const data: SPPages.HomePage = {
    novelAndHomePage,
    reviews: usePreview(token, featuredReviewsQuery),
    posts: usePreview(token, recentPostsQuery),
    author: usePreview(token, authorBioQuery),
    pageColors: getPageColors(novelAndHomePage?.novel)
  };
  return <HomePage data={data} />;
}
