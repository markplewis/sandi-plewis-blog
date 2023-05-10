import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import CategoriesPage from "~/components/pages/categories/CategoriesPage";
import { runQuery } from "~/lib/sanity.client";
import { categoriesQuery, type Categories } from "~/utils/queries/categories";

const CategoriesPagePreview = lazy(
  () => import("~/components/pages/categories/CategoriesPagePreview")
);

export default function Categories({
  preview = false,
  previewData,
  data
}: {
  preview: boolean;
  previewData: string;
  data: Categories;
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <CategoriesPagePreview token={previewData} />
    </PreviewSuspense>
  ) : (
    <CategoriesPage data={data} />
  );
}

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async ({ preview = false, previewData = {} }) => {
  if (preview && previewData) {
    return {
      props: {
        preview,
        previewData
      }
    };
  }
  // "Don't add a try{} catch(){} in getStaticProps" - https://stackoverflow.com/a/71129752/1243086
  // let data = null;
  // try {
  //   data = categoriesQuery.schema.parse(await runQuery(categoriesQuery));
  // } catch (e) {
  //   console.error("Error:", e);
  // }
  const data = categoriesQuery.schema.parse(await runQuery(categoriesQuery));
  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
