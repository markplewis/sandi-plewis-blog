import { getSession } from "next-auth/react";

// See: https://github.com/sanity-io/next-sanity#custom-token-auth
// See: https://authjs.dev/getting-started/oauth-tutorial#protecting-api-routes

const token = process.env.SANITY_API_PREVIEW_READ_TOKEN;

export default async function preview(req, res) {
  const session = await getSession({ req });

  if (session) {
    res.setPreviewData({ token });
    res.writeHead(307, { Location: "/" });
    res.end();
  } else {
    return res.status(401).json({ message: "Invalid session" });
  }
}
