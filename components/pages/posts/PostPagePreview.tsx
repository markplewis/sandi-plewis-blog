"use client";

import PostPage from "~/components/pages/posts/PostPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColorsAndStyles } from "~/utils/color";
import { postQuery, type Post } from "~/utils/queries/posts";

export default function PostPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: Post = usePreview(token, postQuery.query, { slug });

  // Append adjusted page colors
  if (data?.image?.sampledColors) {
    data.pageColorsAndStyles = getPageColorsAndStyles(data.image.sampledColors);
  }
  return <PostPage data={data} />;
}
