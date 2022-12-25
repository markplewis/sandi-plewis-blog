"use client";

import { PostPage } from "components/pages/PostPage";
import { usePreview } from "lib/sanity.preview";
import { postPageQuery } from "utils/queries/postPageQueries";

export default function PostPagePreview({ token, slug }) {
  const data = usePreview(token, postPageQuery, { slug });
  return <PostPage data={data} />;
}
