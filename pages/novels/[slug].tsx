import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
// import util from "util";
import NovelPage from "~/components/pages/novels/NovelPage";
import { client, runQuery } from "~/lib/sanity.client";
import { getPageColorsAndStyles } from "~/utils/color";
import { novelQuery, type Novel } from "~/utils/queries/novels";

const NovelPagePreview = lazy(() => import("~/components/pages/novels/NovelPagePreview"));

export default function Novel({
  preview,
  previewData,
  slug,
  data
}: {
  preview: boolean;
  previewData: string;
  slug: string;
  data: Novel;
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <NovelPagePreview token={previewData} slug={slug} />
    </PreviewSuspense>
  ) : (
    <NovelPage data={data} />
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
        slug: params.slug
      }
    };
  }
  const data = novelQuery.schema.parse(await runQuery(novelQuery, { slug: params.slug }));

  // Append adjusted page colors
  if (data?.image?.sampledColors) {
    data.pageColorsAndStyles = getPageColorsAndStyles(data.image.sampledColors);
  }
  // console.log("novel data", util.inspect(data, false, 5));

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
    groq`*[_type == "novel" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
};
