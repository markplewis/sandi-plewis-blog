"use client";

import { ShortStoryPage } from "components/pages/ShortStoryPage";
import { usePreview } from "lib/sanity.preview";
import { shortStoryPageQuery } from "utils/queries/shortStoryPageQueries";

export default function ShortStoryPagePreview({ token, slug }) {
  const data = usePreview(token, shortStoryPageQuery, { slug });
  return <ShortStoryPage data={data} />;
}
