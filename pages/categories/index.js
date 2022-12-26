import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { CategoriesPage } from "components/pages/CategoriesPage";
import { client } from "lib/sanity.client";
import { categoriesPageQuery } from "utils/queries/categoriesPageQueries";

const CategoriesPagePreview = lazy(() => import("components/pages/CategoriesPagePreview"));

export default function Categories({ preview, token, data }) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <CategoriesPagePreview token={token} />
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
export const getStaticProps = async ({ preview = false, previewData = {} }) => {
  if (preview && previewData?.token) {
    return {
      props: {
        preview,
        token: previewData.token
      }
    };
  }
  const data = await client.fetch(categoriesPageQuery);
  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
