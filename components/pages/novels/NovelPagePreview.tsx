"use client";

import NovelPage from "~/components/pages/novels/NovelPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColorsAndStyles } from "~/utils/color";
import { novelQuery, type Novel } from "~/utils/queries/novels";

export default function NovelPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: Novel = usePreview(token, novelQuery.query, { slug });

  // Append adjusted page colors
  if (data?.image?.sampledColors) {
    data.pageColorsAndStyles = getPageColorsAndStyles(data.image.sampledColors);
  }
  return <NovelPage data={data} />;
}
