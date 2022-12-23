"use client";

import { definePreview } from "next-sanity/preview";
import { projectId, dataset } from "lib/sanity.client";

// See: https://github.com/sanity-io/next-sanity#custom-token-auth

export const usePreview = definePreview({
  projectId,
  dataset
  // See: https://github.com/sanity-io/next-sanity#limits
  // documentLimit: 3000,
  // includeTypes: ["page", "product", "sanity.imageAsset"],
  // // If you have a lot of editors changing content at the same time it might help to increase this value
  // // to reduce the amount of rerenders React have to perform.
  // subscriptionThrottleMs: 300
});
