export const SITE_TITLE = "Sandi Plewis";
export const DEFAULT_META_DESCRIPTION = "Sandi Plewis' personal website and blog";

// These values are repeated in `studio/resolveProductionUrl.js`
const environments = {
  production: "https://www.sandiplewis.com",
  development: "https://dev.sandiplewis.com",
  local: "http://localhost:3000"
};

// NODE_ENV will be one of the following: https://nextjs.org/docs/messages/non-standard-node-env

export const envProd =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SANITY_DATASET === "production";

export const envDev =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SANITY_DATASET === "development";

export const envLocal = !envProd && !envDev;

export const env = envProd ? "production" : envDev ? "development" : "local";

export const BASE_URL = envLocal
  ? environments.local
  : envDev
  ? environments.development
  : environments.production;
