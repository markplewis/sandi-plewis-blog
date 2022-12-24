"use client";

import { PostsPage } from "components/pages/PostsPage";
import { usePreview } from "lib/sanity.preview";
import { postsPageQuery } from "utils/queries/postsPageQueries";

export default function PostsPagePreview({ token }) {
  const data = usePreview(token, postsPageQuery);
  return <PostsPage data={data} preview={true} />;
}
