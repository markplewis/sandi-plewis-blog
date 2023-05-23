import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
// import util from "util";
import CategoriesPage from "~/components/pages/categories/CategoriesPage";
import { runQuery } from "~/lib/sanity.client";
import { categoriesQuery, type Category } from "~/utils/queries/categories";

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
  data: Category[];
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
  const data = categoriesQuery.schema.parse(await runQuery(categoriesQuery));
  // console.log("categories data", util.inspect(data, false, 5));

  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
