"use client";

import CategoryPage from "~/components/pages/categories/CategoryPage";
import { usePreview } from "~/lib/sanity.preview";
import { categoryQuery, type Category } from "~/utils/queries/categories";

export default function CategoryPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: Category = usePreview(token, categoryQuery.query, { slug });
  return <CategoryPage data={data} />;
}
