"use client";

import { definePreview } from "next-sanity/preview";
import { projectId, dataset } from "lib/sanity.client";

// See: https://github.com/sanity-io/next-sanity#custom-token-auth

export const usePreview = definePreview({ projectId, dataset });
