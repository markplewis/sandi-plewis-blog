"use client";

import ShortStoryPage from "components/pages/ShortStoryPage";
import { usePreview } from "lib/sanity.preview";
import { shortStoryQuery } from "utils/queries/shortStories";

export default function ShortStoryPagePreview({ token, slug }) {
  const data = usePreview(token, shortStoryQuery, { slug });
  return <ShortStoryPage data={data} />;
}
