import { SanityDocument } from "@sanity/client";
import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next"; // NextPage
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import AuthorPage from "~/components/pages/authors/AuthorPage";
import { client } from "~/lib/sanity.client";
import { getPageColors } from "~/utils/color";
import { authorQuery } from "~/utils/queries/authors";

const AuthorPagePreview = lazy(() => import("~/components/pages/authors/AuthorPagePreview"));

type AuthorPageProps = {
  preview: boolean;
  previewData: string;
  slug: string;
  data: SanityDocument;
};

// const Author: NextPage<AuthorPageProps> = ({ preview, previewData, slug, data }) => {
const Author = ({ preview, previewData, slug, data }: AuthorPageProps) => {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <AuthorPagePreview token={previewData} slug={slug} />
    </PreviewSuspense>
  ) : (
    <AuthorPage data={data} />
  );
};

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { preview = false, previewData, params } = context;

  if (preview && previewData) {
    return {
      props: {
        preview,
        previewData,
        slug: params?.slug
      }
    };
  }
  const data = await client.fetch(authorQuery, {
    slug: params?.slug
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
    groq`*[_type == "author" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
};

export default Author;
