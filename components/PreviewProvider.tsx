import { LiveQueryProvider } from "next-sanity/preview";
import { useMemo } from "react";
import { getClient } from "~/lib/sanity.client";

// See "Setup preview functionality": https://www.sanity.io/guides/nextjs-live-preview#86c85dfb0cb7
// See "Setup Live Previews": https://github.com/sanity-io/next-sanity/blob/main/PREVIEW-pages-router.md
// See "Configuring draft mode": https://nextjs.org/docs/pages/building-your-application/configuring/draft-mode

export default function PreviewProvider({
  children,
  token
}: {
  children: React.ReactNode;
  token: string;
}) {
  const client = useMemo(() => getClient({ token }), [token]);
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
