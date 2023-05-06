import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import CategoriesPage from "~/components/pages/categories/CategoriesPage";
import { client } from "~/lib/sanity.client";
import { SPPages } from "~/typings/pages.d";
import { categoriesQuery } from "~/utils/queries/categories";

const CategoriesPagePreview = lazy(
  () => import("~/components/pages/categories/CategoriesPagePreview")
);

export default function Categories({ preview, previewData, data }: SPPages.DirectoryPage) {
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
  const data = await client.fetch(categoriesQuery);
  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
