"use client";

import { WritingPage } from "components/pages/WritingPage";
import { usePreview } from "lib/sanity.preview";
import { novelsQuery, shortStoriesQuery } from "utils/queries/writing";

export default function WritingPagePreview({ token }) {
  const data = {
    novels: usePreview(token, novelsQuery),
    shortStories: usePreview(token, shortStoriesQuery)
  };
  return <WritingPage data={data} />;
}
