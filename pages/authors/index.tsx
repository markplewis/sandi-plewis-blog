import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import util from "util";
import AuthorsPage from "~/components/pages/authors/AuthorsPage";
import { runQuery } from "~/lib/sanity.client";
import { authorsQuery, type Author } from "~/utils/queries/authors";

const AuthorsPagePreview = lazy(() => import("~/components/pages/authors/AuthorsPagePreview"));

export default function Authors({
  preview = false,
  previewData,
  data
}: {
  preview: boolean;
  previewData: string;
  data: Author[];
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <AuthorsPagePreview token={previewData} />
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
export const getStaticProps: GetStaticProps = async ({ preview = false, previewData = {} }) => {
  if (preview && previewData) {
    return {
      props: {
        preview,
        previewData
      }
    };
  }
  const data = authorsQuery.schema.parse(await runQuery(authorsQuery));
  console.log("authors data", util.inspect(data, false, 5));

  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};
