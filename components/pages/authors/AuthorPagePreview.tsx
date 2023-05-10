"use client";

import AuthorPage from "~/components/pages/authors/AuthorPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColors } from "~/utils/color";
import { authorQuery, type Author } from "~/utils/queries/authors";

export default function AuthorPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: Author = usePreview(token, authorQuery.query, { slug });
  if (data?.image?.pageColors) {
    data.pageColors = getPageColors(data.image.pageColors); // Append adjusted page colors
  }
  return <AuthorPage data={data} />;
}
