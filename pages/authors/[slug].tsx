import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next"; // NextPage
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
// import util from "util";
import AuthorPage from "~/components/pages/authors/AuthorPage";
import { client, runQuery } from "~/lib/sanity.client";
import { getPageColorsAndStyles } from "~/utils/color";
import { authorQuery, type Author } from "~/utils/queries/authors";

const AuthorPagePreview = lazy(() => import("~/components/pages/authors/AuthorPagePreview"));

export default function Author({
  preview,
  previewData,
  slug,
  data
}: {
  preview: boolean;
  previewData: string;
  slug: string;
  data: Author;
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <AuthorPagePreview token={previewData} slug={slug} />
    </PreviewSuspense>
  ) : (
    <AuthorPage data={data} />
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
        slug: params?.slug
      }
    };
  }
  const data = authorQuery.schema.parse(await runQuery(authorQuery, { slug: params.slug }));

  // Append adjusted page colors
  if (data?.image?.sampledColors) {
    data.pageColorsAndStyles = getPageColorsAndStyles(data.image.sampledColors);
  }
  // console.log("author data", util.inspect(data, false, 5));

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
