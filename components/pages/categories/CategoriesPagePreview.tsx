"use client";

import CategoriesPage from "~/components/pages/categories/CategoriesPage";
import { usePreview } from "~/lib/sanity.preview";
import { categoriesQuery } from "~/utils/queries/categories";

export default function CategoriesPagePreview({ token }) {
  const data = usePreview(token, categoriesQuery);
  return <CategoriesPage data={data} />;
}
