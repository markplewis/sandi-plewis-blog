"use client";

import CategoryPage from "~/components/pages/categories/CategoryPage";
import { usePreview } from "~/lib/sanity.preview";
import { categoryWithPostsQuery, type CategoryWithPosts } from "~/utils/queries/categories";

export default function CategoryPagePreview({ token, slug }: { token: string; slug: string }) {
  const data: CategoryWithPosts = usePreview(token, categoryWithPostsQuery.query, { slug });
  return <CategoryPage data={data} />;
}
