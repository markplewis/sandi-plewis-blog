"use client";

import PostPage from "components/pages/PostPage";
import { usePreview } from "lib/sanity.preview";
import { getPageColors } from "utils/color";
import { postQuery } from "utils/queries/posts";

export default function PostPagePreview({ token, slug }) {
  const data = usePreview(token, postQuery, { slug });

  // Append adjusted page colors
  // console.log("data.image.pageColors", data.image.pageColors); // Isn't changing :(
  data.pageColors = getPageColors(data);

  return <PostPage data={data} />;
}
