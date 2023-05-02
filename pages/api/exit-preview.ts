import type { NextApiRequest, NextApiResponse } from "next";

// See: https://github.com/sanity-io/next-sanity#custom-token-auth

export default function exit(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.writeHead(307, { Location: "/" });
  res.end();
}
