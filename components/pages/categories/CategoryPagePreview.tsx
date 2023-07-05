"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import CategoryPage from "~/components/pages/categories/CategoryPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { categoryWithPostsQuery, type CategoryWithPosts } from "~/utils/queries/categories";

export default function CategoryPagePreview({ data: initialData }: { data: CategoryWithPosts }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, categoryWithPostsQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <CategoryPage data={data} />
    </>
  );
}
