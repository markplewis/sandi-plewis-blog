import groq from "groq";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import ShortStoryPage from "components/pages/ShortStoryPage";
import { client } from "lib/sanity.client";
import { getPageColors } from "utils/color";
import { shortStoryQuery } from "utils/queries/shortStories";

const ShortStoryPagePreview = lazy(() => import("components/pages/ShortStoryPagePreview"));

export default function ShortStory({ preview, token, slug, data }) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <ShortStoryPagePreview token={token} slug={slug} />
    </PreviewSuspense>
  ) : (
    <ShortStoryPage data={data} />
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
  const data = await client.fetch(shortStoryQuery, {
    slug: params.slug
  });

  // Append adjusted page colors
  data.pageColors = getPageColors(data);

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
    groq`*[_type == "shortStory" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
}
