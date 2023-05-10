"use client";

import CategoriesPage from "~/components/pages/categories/CategoriesPage";
import { usePreview } from "~/lib/sanity.preview";
import { categoriesQuery, type Categories } from "~/utils/queries/categories";

export default function CategoriesPagePreview({ token }: { token: string }) {
  const data: Categories = usePreview(token, categoriesQuery.query);
  return <CategoriesPage data={data} />;
}
