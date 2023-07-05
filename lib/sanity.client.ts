import { makeSafeQueryRunner } from "groqd";
import { createClient, type SanityClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

// See "Setup preview functionality": https://www.sanity.io/guides/nextjs-live-preview#86c85dfb0cb7
// See "Setup Live Previews": https://github.com/sanity-io/next-sanity/blob/main/PREVIEW-pages-router.md
// See "Configuring draft mode": https://nextjs.org/docs/pages/building-your-application/configuring/draft-mode

// Because we're only using the Sanity client within the `getStaticProps` and `getStaticPaths`
// functions, both of which execute server-side only, generating static HTML and JSON which can
// then be cached by a CDN, it makes sense to fetch the freshest possible data from the Sanity
// content lake. Therefore, this value should always be `false`. However, let's play it safe and
// check whether it's being used client-side, just in case.
// See: https://nextjs.org/docs/basic-features/data-fetching/overview
const useCdn = typeof document !== "undefined";

export function getClient(preview: { token: string } | null = null): SanityClient {
  // See: https://github.com/sanity-io/client
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    // See: https://www.sanity.io/docs/perspectives
    perspective: "published"
  });
  if (preview) {
    if (!preview.token) {
      throw new Error("You must provide a token to preview drafts");
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: "previewDrafts"
    });
  }
  return client;
}

// Wrap `sanityClient.fetch` (see: https://formidable.com/open-source/groqd/utility-methods)
export const runQuery = makeSafeQueryRunner(
  (query, params: Record<string, unknown> = {}, preview: { token: string } | null = null) => {
    return getClient(preview).fetch(query, params);
  }
);
