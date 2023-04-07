import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import NovelPage from "components/pages/NovelPage";
import { client } from "lib/sanity.client";
import { getPageColors } from "utils/color";
import { novelQuery } from "utils/queries/novels";

const NovelPagePreview = lazy(() => import("components/pages/NovelPagePreview"));

export default function Novel({ preview, token, slug, data }) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <NovelPagePreview token={token} slug={slug} />
    </PreviewSuspense>
  ) : (
    <NovelPage data={data} />
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

  const data = await client.fetch(novelQuery, {
    slug: params.slug
  });
  // Append adjusted page colors
  if (data) {
    data.pageColors = getPageColors(data);
  }
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
    groq`*[_type == "novel" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
}
