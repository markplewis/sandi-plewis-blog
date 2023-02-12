"use client";

import ShortStoryPage from "components/pages/ShortStoryPage";
import { usePreview } from "lib/sanity.preview";
import { getPageColors } from "utils/color";
import { shortStoryQuery } from "utils/queries/shortStories";

export default function ShortStoryPagePreview({ token, slug }) {
  const data = usePreview(token, shortStoryQuery, { slug });

  // Append adjusted page colors
  data.pageColors = getPageColors(data);

  return <ShortStoryPage data={data} />;
}
