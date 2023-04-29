"use client";

import PostsPage from "~/components/pages/posts/PostsPage";
import { usePreview } from "~/lib/sanity.preview";
import { postsQuery } from "~/utils/queries/posts";

export default function PostsPagePreview({ token }) {
  const data = usePreview(token, postsQuery);
  return <PostsPage data={data} />;
}
