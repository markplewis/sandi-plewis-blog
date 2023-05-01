import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// See: https://github.com/sanity-io/next-sanity#custom-token-auth
// See: https://authjs.dev/getting-started/oauth-tutorial#protecting-api-routes

// TODO: declare global env types in `environment.d.ts`? https://stackoverflow.com/a/53981706/1243086
const token: string = process.env.SANITY_API_PREVIEW_READ_TOKEN || "";

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    // By default, no expiration date is set for Preview Mode cookies,
    // so the preview session ends when the browser is closed.
    // https://nextjs.org/docs/advanced-features/preview-mode#clear-the-preview-mode-cookies
    res.setPreviewData(token);
    res.writeHead(307, { Location: "/" });
    res.end();
  } else {
    return res.status(401).json({ message: "Access denied" });
  }
}
