import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
// import util from "util";
import CategoryPage from "~/components/pages/categories/CategoryPage";
import { client, runQuery } from "~/lib/sanity.client";
import { categoryQuery, type Category } from "~/utils/queries/categories";

const CategoryPagePreview = lazy(() => import("~/components/pages/categories/CategoryPagePreview"));

export default function Category({
  preview,
  previewData,
  slug,
  data
}: {
  preview: boolean;
  previewData: string;
  slug: string;
  data: Category;
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <CategoryPagePreview token={previewData} slug={slug} />
    </PreviewSuspense>
  ) : (
    <CategoryPage data={data} />
  );
}

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData = {},
  params = {}
}) => {
  if (preview && previewData) {
    return {
      props: {
        preview,
        previewData,
        slug: params.slug
      }
    };
  }
  const data = categoryQuery.schema.parse(await runQuery(categoryQuery, { slug: params.slug }));
  // console.log("categoryQuery", util.inspect(data, false, 5));
  // const data = await client.fetch(categoryQuery, {
  //   slug: params.slug
  // });
  return {
    props: {
      preview,
      data
    },
    notFound: !data,
    revalidate: 10
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "category" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
};
