import { SanityDocument } from "@sanity/client";
import { GetStaticProps } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import AuthorsPage from "~/components/pages/authors/AuthorsPage";
import { client } from "~/lib/sanity.client";
import { authorsQuery } from "~/utils/queries/authors";

const AuthorsPagePreview = lazy(() => import("~/components/pages/authors/AuthorsPagePreview"));

type AuthorsPageProps = {
  preview: boolean;
  previewData: string;
  data: SanityDocument;
};

export default function Authors({ preview, previewData, data }: AuthorsPageProps) {
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
  const data = await client.fetch(authorsQuery);
  return {
    props: {
      preview,
      data
    },
    revalidate: 10
  };
};