"use client";

import PostsPage from "~/components/pages/posts/PostsPage";
import { usePreview } from "~/lib/sanity.preview";
import { postsQuery, type Post } from "~/utils/queries/posts";

export default function PostsPagePreview({ token }: { token: string }) {
  const data: Post[] = usePreview(token, postsQuery.query);
  return <PostsPage data={data} />;
}
