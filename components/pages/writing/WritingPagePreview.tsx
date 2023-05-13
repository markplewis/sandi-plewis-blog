"use client";

import WritingPage from "~/components/pages/writing/WritingPage";
import { usePreview } from "~/lib/sanity.preview";
import { novelsQuery } from "~/utils/queries/novels";
import { shortStoriesQuery } from "~/utils/queries/shortStories";
import type { NovelsAndShortStories } from "~/utils/queries/shared";

export default function WritingPagePreview({ token }: { token: string }) {
  const data: NovelsAndShortStories = {
    novels: usePreview(token, novelsQuery.query),
    shortStories: usePreview(token, shortStoriesQuery.query)
  };
  return <WritingPage data={data} />;
}
