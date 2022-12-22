// See: https://github.com/sanity-io/next-sanity#custom-token-auth

export default function exit(req, res) {
  res.clearPreviewData();
  res.writeHead(307, { Location: "/" });
  res.end();
}
