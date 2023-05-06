"use client";

import { SanityDocument } from "@sanity/client";
import AuthorPage from "~/components/pages/authors/AuthorPage";
import { usePreview } from "~/lib/sanity.preview";
import { getPageColors } from "~/utils/color";
import { authorQuery } from "~/utils/queries/authors";

export default function AuthorPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: SanityDocument = usePreview(token, authorQuery, { slug });
  if (data) {
    data.pageColors = getPageColors(data); // Append adjusted page colors
  }
  return <AuthorPage data={data} />;
}
