import { createClient } from "next-sanity";

// TODO: is the following still true?
// Set `useCdn` to `false` if your application always requires the freshest possible data
// (potentially slower and more expensive). Authenticated requests (like Next's preview mode)
// will always bypass the CDN.

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

const useCdn = process.env.NODE_ENV === "production";

export const client = createClient({ projectId, dataset, apiVersion, useCdn });
