import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { CategoryPage } from "components/pages/CategoryPage";
import { client } from "lib/sanity.client";
import { categoryPageQuery } from "utils/queries/categoryPageQueries";

const CategoryPagePreview = lazy(() => import("components/pages/CategoryPagePreview"));

export default function Category({ preview, token, slug, data }) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <CategoryPagePreview token={token} slug={slug} />
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
export const getStaticProps = async ({ preview = false, previewData = {}, params = {} }) => {
  if (preview && previewData?.token) {
    return {
      props: {
        preview,
        token: previewData.token,
        slug: params.slug
      }
    };
  }
  const data = await client.fetch(categoryPageQuery, {
    slug: params.slug
  });
  return {
    props: {
      preview,
      data
    },
    notFound: !data,
    revalidate: 10
  };
};

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "category" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
}
