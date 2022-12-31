"use client";

import PostPage from "components/pages/PostPage";
import { usePreview } from "lib/sanity.preview";
import { postQuery } from "utils/queries/posts";

export default function PostPagePreview({ token, slug }) {
  const data = usePreview(token, postQuery, { slug });
  return <PostPage data={data} />;
}
