import type { SPPages } from "~/types/pages.d";

import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import NovelPage from "~/components/pages/novels/NovelPage";
import { client } from "~/lib/sanity.client";
import { getPageColors } from "~/utils/color";
import { novelQuery } from "~/utils/queries/novels";

const NovelPagePreview = lazy(() => import("~/components/pages/novels/NovelPagePreview"));

export default function Novel({ preview, previewData, slug, data }: SPPages.LeafPage) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <NovelPagePreview token={previewData} slug={slug} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "novel" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
};
