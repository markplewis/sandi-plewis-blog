"use client";

import { definePreview, PreviewConfig, UsePreview } from "next-sanity/preview";
import { projectId, dataset } from "~/lib/sanity.client";

// See: https://github.com/sanity-io/next-sanity#custom-token-auth

const previewConfig: PreviewConfig = {
  projectId,
  dataset
  // See: https://github.com/sanity-io/next-sanity#limits
  // documentLimit: 3000,
  // includeTypes: ["page", "product", "sanity.imageAsset"],
  // // If you have a lot of editors changing content at the same time it might help to increase this value
  // // to reduce the amount of rerenders React have to perform.
  // subscriptionThrottleMs: 300
};

export const usePreview: UsePreview = definePreview(previewConfig);
