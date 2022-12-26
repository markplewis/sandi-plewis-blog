"use client";

import { NovelPage } from "components/pages/NovelPage";
import { usePreview } from "lib/sanity.preview";
import { novelPageQuery } from "utils/queries/novelPageQueries";

export default function NovelPagePreview({ token, slug }) {
  const data = usePreview(token, novelPageQuery, { slug });
  return <NovelPage data={data} />;
}
