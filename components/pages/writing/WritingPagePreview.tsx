"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import WritingPage from "~/components/pages/writing/WritingPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { novelsQuery } from "~/utils/queries/novels";
import { shortStoriesQuery } from "~/utils/queries/shortStories";
import type { NovelsAndShortStories } from "~/utils/queries/shared";

export default function WritingPagePreview({ data: initialData }: { data: NovelsAndShortStories }) {
  const params = useRouter().query;
  const { novels, shortStories } = initialData;
  const [novelsData, novelsLoading] = useLiveQuery(novels, novelsQuery.query, params);
  const [shortStoriesData, shortStoriesLoading] = useLiveQuery(
    shortStories,
    shortStoriesQuery.query,
    params
  );
  const data = {
    novels: novelsData,
    shortStories: shortStoriesData
  };
  return (
    <>
      {novelsLoading || shortStoriesLoading ? <PreviewLoadingMessage /> : null}
      <WritingPage data={data} />
    </>
  );
}
