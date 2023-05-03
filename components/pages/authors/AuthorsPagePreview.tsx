"use client";

import { SanityDocument } from "@sanity/client";
import AuthorsPage from "~/components/pages/authors/AuthorsPage";
import { usePreview } from "~/lib/sanity.preview";
import { authorsQuery } from "~/utils/queries/authors";

export default function AuthorsPagePreview({ token }: { token: string }) {
  const data: SanityDocument = usePreview(token, authorsQuery);
  return <AuthorsPage data={data} />;
}
