import groq from "groq";
import { GetStaticProps, GetStaticPaths } from "next";
import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
// import util from "util";
import PostPage from "~/components/pages/posts/PostPage";
import { client, runQuery } from "~/lib/sanity.client";
import { getPageColorsAndStyles } from "~/utils/color";
import { postQuery, type Post } from "~/utils/queries/posts";

const PostPagePreview = lazy(() => import("~/components/pages/posts/PostPagePreview"));

// See: https://www.sanity.io/guides/nextjs-live-preview

export default function Post({
  preview,
  previewData,
  slug,
  data
}: {
  preview: boolean;
  previewData: string;
  slug: string;
  data: Post;
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PostPagePreview token={previewData} slug={slug} />
    </PreviewSuspense>
  ) : (
    <PostPage data={data} />
  );
}

// This function gets called at build time on the server side ("Static Generation"). It may be
// called again, via a serverless function ("Incremental Static Regeneration"), if revalidation
// is enabled and a new request comes in (see below). See:
// https://nextjs.org/docs/basic-features/data-fetching/get-static-props
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

// If the preview mode cookies are set, then this function will be called at request time instead of
// build time: https://nextjs.org/docs/advanced-features/preview-mode#step-2-update-getstaticprops

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
  const data = postQuery.schema.parse(await runQuery(postQuery, { slug: params.slug }));

  // Append adjusted page colors
  if (data?.image?.sampledColors) {
    data.pageColorsAndStyles = getPageColorsAndStyles(data.image.sampledColors);
  }
  // console.log("post data", util.inspect(data, false, 5));

  return {
    props: {
      preview,
      data
    },
    // Return a 404 status and page if the post doesn't exist yet or no longer exists
    notFound: !data,
    // When `revalidate` is `false` (its default value) the page will be cached as built until your
    // next build. Otherwise, Next.js will attempt to re-generate the page when a request comes in,
    // once every X seconds (at most).
    revalidate: 10 // In seconds
  };
};

// Specify dynamic routes to pre-render pages based on data.
// This function gets called at build time on the server side ("Static Generation"). It may be
// called again, via a serverless function ("Incremental Static Regeneration"), if the requested
// path has not been generated yet (i.e. when new posts are published after a build). Without this
// mechanism in place, the site would need to be rebuilt every time a new post is published.
// See: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation

export const getStaticPaths: GetStaticPaths = async () => {
  // Pre-render only these paths at build time
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  // `fallback: blocking` will server-render pages on demand if the path
  // wasn't statically pre-rendered (i.e. didn't exist at build time)
  // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
  // https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  return {
    paths,
    fallback: "blocking"
  };
};

// More information about CSR (Client-Side Rendering), SSR (Server-Side Rendering),
// SSG (Static-Site Generation), and ISR (Incremental Static Regeneration):
// https://youtu.be/f1rF9YKm1Ms
