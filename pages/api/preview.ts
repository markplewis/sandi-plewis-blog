import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";

// See "Setup preview functionality": https://www.sanity.io/guides/nextjs-live-preview#86c85dfb0cb7
// See "Setup Live Previews": https://github.com/sanity-io/next-sanity/blob/main/PREVIEW-pages-router.md
// See "Configuring draft mode": https://nextjs.org/docs/pages/building-your-application/configuring/draft-mode
// See "Protecting API Routes": https://authjs.dev/getting-started/oauth-tutorial#protecting-api-routes

export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    // By default, no expiration date is set for Preview Mode cookies,
    // so the preview session ends when the browser is closed.
    res.setDraftMode({ enable: true });
    res.writeHead(307, { Location: "/" });
    res.end();
  } else {
    return res.status(401).json({ message: "Access denied" });
  }
}
