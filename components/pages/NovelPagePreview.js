"use client";

import NovelPage from "components/pages/NovelPage";
import { usePreview } from "lib/sanity.preview";
import { getPageColors } from "utils/color";
import { novelQuery } from "utils/queries/novels";

export default function NovelPagePreview({ token, slug }) {
  const data = usePreview(token, novelQuery, { slug });
  // Append adjusted page colors
  if (data) {
    data.pageColors = getPageColors(data);
  }
  return <NovelPage data={data} />;
}
