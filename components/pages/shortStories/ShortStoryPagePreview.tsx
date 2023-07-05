"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import ShortStoryPage from "~/components/pages/shortStories/ShortStoryPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { shortStoryQuery, type ShortStory } from "~/utils/queries/shortStories";

export default function ShortStoryPagePreview({ data: initialData }: { data: ShortStory }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, shortStoryQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <ShortStoryPage data={data} />
    </>
  );
}
