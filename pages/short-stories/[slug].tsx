import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import ShortStoryPage from "~/components/pages/shortStories/ShortStoryPage";
import { client } from "~/lib/sanity.client";
import { SPPages } from "~/typings/pages.d";
import { getPageColors } from "~/utils/color";
import { shortStoryQuery } from "~/utils/queries/shortStories";

const ShortStoryPagePreview = lazy(
  () => import("~/components/pages/shortStories/ShortStoryPagePreview")
);

export default function ShortStory({ preview, previewData, slug, data }: SPPages.LeafPage) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <ShortStoryPagePreview token={previewData} slug={slug} />
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
  const data = await client.fetch(shortStoryQuery, {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "shortStory" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
};
