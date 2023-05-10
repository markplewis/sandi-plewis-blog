import type { SPPages } from "~/types/pages.d";

import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import PostsPage from "~/components/pages/posts/PostsPage";
import { client } from "~/lib/sanity.client";
import { postsQuery } from "~/utils/queries/posts";

const PostsPagePreview = lazy(() => import("~/components/pages/posts/PostsPagePreview"));

export default function Posts({ preview, previewData, data }: SPPages.DirectoryPage) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PostsPagePreview token={previewData} />
    </PreviewSuspense>
  ) : (
    <PostsPage data={data} />
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
  const data = await client.fetch(postsQuery);
  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
