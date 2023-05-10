"use client";

import type { SanityDocument } from "@sanity/client";

import PostsPage from "~/components/pages/posts/PostsPage";
import { usePreview } from "~/lib/sanity.preview";
import { postsQuery } from "~/utils/queries/posts";

export default function PostsPagePreview({ token }: { token: string }) {
  const data: SanityDocument = usePreview(token, postsQuery);
  return <PostsPage data={data} />;
}
