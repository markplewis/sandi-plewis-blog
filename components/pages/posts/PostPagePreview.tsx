"use client";

import PostPage from "~/components/pages/posts/PostPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColors } from "~/utils/color";
import { postQuery } from "~/utils/queries/posts";

export default function PostPagePreview({ token, slug }: { token: string; slug: string }) {
  const data = usePreview(token, postQuery, { slug });
  // Append adjusted page colors
  if (data) {
    data.pageColors = getPageColors(data);
  }
  return <PostPage data={data} />;
}
