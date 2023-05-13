"use client";

import AuthorPage from "~/components/pages/authors/AuthorPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColorsAndStyles } from "~/utils/color";
import { authorQuery, type Author } from "~/utils/queries/authors";

export default function AuthorPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: Author = usePreview(token, authorQuery.query, { slug });

  // Append adjusted page colors
  if (data?.image?.sampledColors) {
    data.pageColorsAndStyles = getPageColorsAndStyles(data.image.sampledColors);
  }
  return <AuthorPage data={data} />;
}
