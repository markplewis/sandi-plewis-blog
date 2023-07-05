"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import CategoriesPage from "~/components/pages/categories/CategoriesPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { categoriesQuery, type Category } from "~/utils/queries/categories";

export default function CategoriesPagePreview({ data: initialData }: { data: Category[] }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, categoriesQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <CategoriesPage data={data} />
    </>
  );
}
