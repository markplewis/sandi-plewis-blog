import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

// Because we're only using the Sanity client within the `getStaticProps` and `getStaticPaths`
// functions, both of which execute server-side only, generating static HTML and JSON which can
// then be cached by a CDN, it makes sense to fetch the freshest possible data from the Sanity
// content lake. Therefore, this value should always be `false`. However, let's play it safe and
// check whether it's being used client-side, just in case.
// See: https://nextjs.org/docs/basic-features/data-fetching/overview
const useCdn = typeof document !== "undefined";

// See: https://github.com/sanity-io/client
export const client = createClient({ projectId, dataset, apiVersion, useCdn });
