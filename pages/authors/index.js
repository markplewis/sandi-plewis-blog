import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import AuthorsPage from "components/pages/authors/AuthorsPage";
import { client } from "lib/sanity.client";
import { authorsQuery } from "utils/queries/authors";

const AuthorsPagePreview = lazy(() => import("components/pages/authors/AuthorsPagePreview"));

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
  const data = await client.fetch(authorsQuery);
  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
