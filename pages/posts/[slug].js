import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { PostPage } from "components/pages/PostPage";
import { client } from "lib/sanity.client";
import { postPageQuery } from "utils/queries/postPageQueries";

const PostPagePreview = lazy(() => import("components/pages/PostPagePreview"));

export default function Post({ preview, token, data }) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PostPagePreview token={token} />
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

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps = async ({ preview = false, previewData = {}, params = {} }) => {
  if (preview && previewData?.token) {
    return {
      props: {
        preview,
        token: previewData.token
      }
    };
  }
  const data = await client.fetch(postPageQuery, {
    slug: params.slug
  });
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

export async function getStaticPaths() {
  // Pre-render only these paths at build time
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  // `fallback: blocking` will server-render pages on demand if the path
  // wasn't statically pre-rendered (i.e. didn't exist at build time)
  // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
  // https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  return {
    paths,
    fallback: "blocking"
  };
}

// More information about CSR (Client-Side Rendering), SSR (Server-Side Rendering),
// SSG (Static-Site Generation), and ISR (Incremental Static Regeneration):
// https://youtu.be/f1rF9YKm1Ms
