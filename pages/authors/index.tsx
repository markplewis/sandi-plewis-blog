import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import AuthorsPage from "~/components/pages/authors/AuthorsPage";
import PreviewProvider from "~/components/PreviewProvider";
import { runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { authorsQuery, type Author } from "~/utils/queries/authors";

const AuthorsPagePreview = dynamic(() => import("~/components/pages/authors/AuthorsPagePreview"));

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async context => {
  const { previewMode, previewToken, preview } = getPreviewModeData(context);
  let data;
  try {
    data = authorsQuery.schema.parse(await runQuery(authorsQuery, context.params, preview));
    // console.log("authors data", util.inspect(data, false, 5));
  } catch (e) {
    console.error(e);
  }
  return {
    props: {
      data,
      previewMode,
      previewToken
    },
    revalidate: 10
  };
};

export default function Authors({
  data,
  previewMode,
  previewToken
}: {
  data: Author[];
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <AuthorsPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <AuthorsPage data={data} />
  );
}
