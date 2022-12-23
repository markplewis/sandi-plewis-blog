// See: https://github.com/sanity-io/next-sanity#custom-token-auth

// The secret can't be stored in an env variable with a NEXT_PUBLIC_ prefix, as it would make you
// vulnerable to leaking the token to anyone. If you don't have an custom API with authentication
// that can handle checking secrets, you may use https://github.com/sanity-io/sanity-studio-secrets
// to store the secret in your dataset.
const secret = process.env.SANITY_API_PREVIEW_SECRET;
const token = process.env.SANITY_API_PREVIEW_READ_TOKEN;

export default async function preview(req, res) {
  // This is the most common way to check for auth, but we encourage you to use your existing auth
  // infra to protect your token and securely transmit it to the client
  if (!req.query.secret || req.query.secret !== secret) {
    return res.status(401).json({ message: "Invalid secret" });
  }
  res.setPreviewData({ token });
  res.writeHead(307, { Location: "/" });
  res.end();
}
