import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { AuthorsPage } from "components/pages/AuthorsPage";
import { client } from "lib/sanity.client";
import { authorsPageQuery } from "utils/queries/authorsPageQueries";

const AuthorsPagePreview = lazy(() => import("components/pages/AuthorsPagePreview"));

export default function Authors({ preview, token, data }) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <AuthorsPagePreview token={token} />
    </PreviewSuspense>
  ) : (
    <AuthorsPage data={data} />
  );
}

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps = async ({ preview = false, previewData = {} }) => {
  if (preview && previewData?.token) {
    return {
      props: {
        preview,
        token: previewData.token
      }
    };
  }
  const data = await client.fetch(authorsPageQuery);
  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
