"use client";

import { SanityDocument } from "@sanity/client";
import CategoryPage from "~/components/pages/categories/CategoryPage";
import { usePreview } from "~/lib/sanity.preview";
import { categoryQuery } from "~/utils/queries/categories";

export default function CategoryPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: SanityDocument = usePreview(token, categoryQuery, { slug });
  return <CategoryPage data={data} />;
}
