import { SanityDocument } from "@sanity/client";
import groq from "groq";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths, NextPage, PreviewData } from "next";
import { PreviewSuspense } from "next-sanity/preview";
// import { ParsedUrlQuery } from "querystring";
import { lazy } from "react";
import AuthorPage from "~/components/pages/authors/AuthorPage";
import { client } from "~/lib/sanity.client";
import { getPageColors } from "~/utils/color";
import { authorQuery } from "~/utils/queries/authors";

const AuthorPagePreview = lazy(() => import("~/components/pages/authors/AuthorPagePreview"));

type AuthorPageProps = {
  preview: boolean;
  token: string;
  // previewData: PreviewData;
  slug: string;
  data: SanityDocument;
};

const Author: NextPage<AuthorPageProps> = ({ preview, token, slug, data }) => {
  // const Author: NextPage<AuthorPageProps> = ({ preview, previewData, slug, data }) => {
  // if (typeof previewData !== "object") {
  //   return;
  // }
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <AuthorPagePreview token={token} slug={slug} />
    </PreviewSuspense>
  ) : (
    <AuthorPage data={data} />
  );
};

// type Foo = { token: string };
// type AuthorPreviewData = PreviewData & Foo;

// type AuthorPreviewData = PreviewData & { token: string };

// type GetAuthorStaticPropsContext<
//   Params extends ParsedUrlQuery = ParsedUrlQuery,
//   AuthorPreviewData = AuthorPreviewData
// > = {
//   params?: Params
//   preview?: boolean
//   previewData?: AuthorPreviewData
//   locale?: string
//   locales?: string[]
//   defaultLocale?: string
// }

// type AuthorPreviewData = { token: string };

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async (
  // context: GetStaticPropsContext<ParsedUrlQuery, AuthorPreviewData>
  context
) => {
  const { preview = false, previewData, params } = context;

  // if (preview && previewData?.token) {
  if (preview && previewData) {
    return {
      props: {
        preview,
        // token: previewData?.token,
        // previewData,
        token: previewData,
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
