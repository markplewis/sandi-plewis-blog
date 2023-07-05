import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import PostsPage from "~/components/pages/posts/PostsPage";
import PreviewProvider from "~/components/PreviewProvider";
import { runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { postsQuery, type Post } from "~/utils/queries/posts";

const PostsPagePreview = dynamic(() => import("~/components/pages/posts/PostsPagePreview"));

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  const data = postsQuery.schema.parse(await runQuery(postsQuery, context.params, preview));
  // console.log("posts data", util.inspect(data, false, 5));
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    revalidate: 10
  };
};

export default function Posts({
  data,
  previewMode,
  previewToken
}: {
  data: Post[];
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <PostsPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <PostsPage data={data} />
  );
}
