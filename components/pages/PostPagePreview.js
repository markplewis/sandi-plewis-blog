"use client";

import PostPage from "components/pages/PostPage";
import { usePreview } from "lib/sanity.preview";
import { getPageColors } from "utils/color";
import { postQuery } from "utils/queries/posts";

export default function PostPagePreview({ token, slug }) {
  const data = usePreview(token, postQuery, { slug });
  data.pageColors = getPageColors(data); // Append adjusted page colors
  return <PostPage data={data} />;
}
