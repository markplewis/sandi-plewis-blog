"use client";

import { usePreview } from "lib/sanity.preview";
import { query, DocumentsCount } from "components/DocumentsCount";

// See: https://github.com/sanity-io/next-sanity#custom-token-auth

export default function PreviewDocumentsCount({ token }) {
  const data = usePreview(token, query);
  return <DocumentsCount data={data} />;
}
