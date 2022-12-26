"use client";

import { NovelPage } from "components/pages/NovelPage";
import { usePreview } from "lib/sanity.preview";
import { novelQuery } from "utils/queries/novels";

export default function NovelPagePreview({ token, slug }) {
  const data = usePreview(token, novelQuery, { slug });
  return <NovelPage data={data} />;
}
