import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import CategoriesPage from "~/components/pages/categories/CategoriesPage";
import PreviewProvider from "~/components/PreviewProvider";
import { runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { categoriesQuery, type Category } from "~/utils/queries/categories";

const CategoriesPagePreview = dynamic(
  () => import("~/components/pages/categories/CategoriesPagePreview")
);

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  let data;
  try {
    data = categoriesQuery.schema.parse(await runQuery(categoriesQuery, context.params, preview));
    // console.log("categories data", util.inspect(data, false, 5));
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    revalidate: 10
  };
};

export default function Categories({
  data,
  previewMode,
  previewToken
}: {
  data: Category[];
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <CategoriesPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <CategoriesPage data={data} />
  );
}
