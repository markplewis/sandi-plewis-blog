"use client";

import ShortStoryPage from "~/components/pages/shortStories/ShortStoryPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColors } from "~/utils/color";
import { shortStoryQuery } from "~/utils/queries/shortStories";

export default function ShortStoryPagePreview({ token, slug }: { token: string; slug: string }) {
  const data = usePreview(token, shortStoryQuery, { slug });
  // Append adjusted page colors
  if (data) {
    data.pageColors = getPageColors(data);
  }
  return <ShortStoryPage data={data} />;
}
