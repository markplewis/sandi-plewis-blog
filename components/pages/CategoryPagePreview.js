"use client";

import { CategoryPage } from "components/pages/CategoryPage";
import { usePreview } from "lib/sanity.preview";
import { categoryPageQuery } from "utils/queries/categoryPageQueries";

export default function CategoryPagePreview({ token, slug }) {
  const data = usePreview(token, categoryPageQuery, { slug });
  return <CategoryPage data={data} />;
}
