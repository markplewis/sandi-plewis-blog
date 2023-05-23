import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
// import util from "util";
import PostsPage from "~/components/pages/posts/PostsPage";
import { runQuery } from "~/lib/sanity.client";
import { postsQuery, type Post } from "~/utils/queries/posts";

const PostsPagePreview = lazy(() => import("~/components/pages/posts/PostsPagePreview"));

export default function Posts({
  preview = false,
  previewData,
  data
}: {
  preview: boolean;
  previewData: string;
  data: Post[];
}) {
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
  const data = postsQuery.schema.parse(await runQuery(postsQuery));
  // console.log("posts data", util.inspect(data, false, 5));

  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
