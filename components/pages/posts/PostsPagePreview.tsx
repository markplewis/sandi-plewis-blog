"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import PostsPage from "~/components/pages/posts/PostsPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { postsQuery, type Post } from "~/utils/queries/posts";

export default function PostsPagePreview({ data: initialData }: { data: Post[] }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, postsQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <PostsPage data={data} />
    </>
  );
}
