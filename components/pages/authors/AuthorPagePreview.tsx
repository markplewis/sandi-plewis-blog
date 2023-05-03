"use client";

import { SanityDocument } from "@sanity/client";
import AuthorPage from "~/components/pages/authors/AuthorPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColors } from "~/utils/color";
import { authorQuery } from "~/utils/queries/authors";

export default function AuthorPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: SanityDocument = usePreview(token, authorQuery, { slug });
  // Append adjusted page colors
  if (data) {
    data.pageColors = getPageColors(data);
  }
  return <AuthorPage data={data} />;
}