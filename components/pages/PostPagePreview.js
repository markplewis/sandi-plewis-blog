"use client";

import { PostPage } from "components/pages/PostPage";
import { usePreview } from "lib/sanity.preview";
import { postPageQuery } from "utils/queries/postPageQueries";

export default function PostPagePreview({ token }) {
  const data = usePreview(token, postPageQuery);
  return <PostPage data={data} />;
}
