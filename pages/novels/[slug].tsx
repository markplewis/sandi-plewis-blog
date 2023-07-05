import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";
import NovelPage from "~/components/pages/novels/NovelPage";
import PreviewProvider from "~/components/PreviewProvider";
import { getClient, runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { novelQuery, type Novel } from "~/utils/queries/novels";

const NovelPagePreview = dynamic(() => import("~/components/pages/novels/NovelPagePreview"));

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getClient().fetch(
    groq`*[_type == "novel" && defined(slug.current)]{ "params": { "slug": slug.current } }`
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
  const data = novelQuery.schema.parse(await runQuery(novelQuery, context.params, preview));
  // console.log("novels data", util.inspect(data, false, 5));
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

export default function Novel({
  data,
  previewMode,
  previewToken
}: {
  data: Novel;
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <NovelPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <NovelPage data={data} />
  );
}
