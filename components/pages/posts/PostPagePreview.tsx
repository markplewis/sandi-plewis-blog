"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import PostPage from "~/components/pages/posts/PostPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { postQuery, type Post } from "~/utils/queries/posts";

export default function PostPagePreview({ data: initialData }: { data: Post }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, postQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <PostPage data={data} />
    </>
  );
}
