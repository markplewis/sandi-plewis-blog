import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import dynamic from "next/dynamic";
import ShortStoryPage from "~/components/pages/shortStories/ShortStoryPage";
import PreviewProvider from "~/components/PreviewProvider";
import { getClient, runQuery } from "~/lib/sanity.client";
import { getPreviewModeData } from "~/utils/previewMode";
import { shortStoryQuery, type ShortStory } from "~/utils/queries/shortStories";

const ShortStoryPagePreview = dynamic(
  () => import("~/components/pages/shortStories/ShortStoryPagePreview")
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getClient().fetch(
    groq`*[_type == "shortStory" && defined(slug.current)]{ "params": { "slug": slug.current } }`
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
    data = shortStoryQuery.schema.parse(await runQuery(shortStoryQuery, context.params, preview));
    // console.log("short story data", util.inspect(data, false, 5));
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

export default function ShortStory({
  data,
  previewMode,
  previewToken
}: {
  data: ShortStory;
  previewMode: boolean;
  previewToken?: string;
}) {
  return previewMode && previewToken ? (
    <PreviewProvider token={previewToken}>
      <ShortStoryPagePreview data={data} />
    </PreviewProvider>
  ) : (
    <ShortStoryPage data={data} />
  );
}
