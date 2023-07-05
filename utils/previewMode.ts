import { GetStaticPropsContext } from "next";

export function getPreviewModeData(context: GetStaticPropsContext) {
  const previewMode = context.draftMode || false;
  const previewToken = previewMode ? process.env.SANITY_API_PREVIEW_READ_TOKEN : "";

  if (previewMode && !previewToken) {
    throw new Error(
      `Preview mode is active, but Sanity read token is not set in environment variables`
    );
  }
  const preview = previewMode ? { token: previewToken } : null;
  return { previewMode, previewToken, preview };
}
