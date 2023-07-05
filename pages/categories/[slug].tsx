import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";
import CategoryPage from "~/components/pages/categories/CategoryPage";
import PreviewProvider from "~/components/PreviewProvider";
import { getClient, runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { categoryWithPostsQuery, type CategoryWithPosts } from "~/utils/queries/categories";

const CategoryPagePreview = dynamic(
  () => import("~/components/pages/categories/CategoryPagePreview")
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getClient().fetch(
    groq`*[_type == "category" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
};

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  const data = categoryWithPostsQuery.schema.parse(
    await runQuery(categoryWithPostsQuery, context.params, preview)
  );
  // console.log("category data", util.inspect(data, false, 5));
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    notFound: !data,
    revalidate: 10
  };
};

export default function Category({
  data,
  previewMode,
  previewToken
}: {
  data: CategoryWithPosts;
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <CategoryPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <CategoryPage data={data} />
  );
}
