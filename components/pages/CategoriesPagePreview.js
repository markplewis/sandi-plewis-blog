"use client";

import { CategoriesPage } from "components/pages/CategoriesPage";
import { usePreview } from "lib/sanity.preview";
import { categoriesPageQuery } from "utils/queries/categoriesPageQueries";

export default function CategoriesPagePreview({ token }) {
  const data = usePreview(token, categoriesPageQuery);
  return <CategoriesPage data={data} />;
}
