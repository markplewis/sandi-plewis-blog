"use client";

import ShortStoryPage from "~/components/pages/shortStories/ShortStoryPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColorsAndStyles } from "~/utils/color";
import { shortStoryQuery, type ShortStory } from "~/utils/queries/shortStories";

export default function ShortStoryPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: ShortStory = usePreview(token, shortStoryQuery.query, { slug });

  // Append adjusted page colors
  if (data?.image?.sampledColors) {
    data.pageColorsAndStyles = getPageColorsAndStyles(data.image.sampledColors);
  }
  return <ShortStoryPage data={data} />;
}
