"use client";

import { CategoryPage } from "components/pages/CategoryPage";
import { usePreview } from "lib/sanity.preview";
import { categoryQuery } from "utils/queries/categories";

export default function CategoryPagePreview({ token, slug }) {
  const data = usePreview(token, categoryQuery, { slug });
  return <CategoryPage data={data} />;
}
