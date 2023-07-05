import type { NextApiRequest, NextApiResponse } from "next";

// See "Setup preview functionality": https://www.sanity.io/guides/nextjs-live-preview#86c85dfb0cb7
// See "Setup Live Previews": https://github.com/sanity-io/next-sanity/blob/main/PREVIEW-pages-router.md
// See "Configuring draft mode": https://nextjs.org/docs/pages/building-your-application/configuring/draft-mode

export default function exit(req: NextApiRequest, res: NextApiResponse) {
  res.setDraftMode({ enable: false });
  res.writeHead(307, { Location: "/" });
  res.end();
}
