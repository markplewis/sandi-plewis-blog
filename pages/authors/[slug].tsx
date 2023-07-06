import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";
import AuthorPage from "~/components/pages/authors/AuthorPage";
import PreviewProvider from "~/components/PreviewProvider";
import { getClient, runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { authorQuery, type Author } from "~/utils/queries/authors";

const AuthorPagePreview = dynamic(() => import("~/components/pages/authors/AuthorPagePreview"));

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getClient().fetch(
    groq`*[_type == "author" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
};

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  let data;
  try {
    data = authorQuery.schema.parse(await runQuery(authorQuery, context.params, preview));
    // console.log("author data", util.inspect(data, false, 5));
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    notFound: !data,
    revalidate: 10
  };
};

export default function Author({
  data,
  previewMode,
  previewToken
}: {
  data: Author;
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <AuthorPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <AuthorPage data={data} />
  );
}
