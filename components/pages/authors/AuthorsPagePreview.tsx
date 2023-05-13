"use client";

import AuthorsPage from "~/components/pages/authors/AuthorsPage";
import { usePreview } from "~/lib/sanity.preview";
import { authorsQuery, type Author } from "~/utils/queries/authors";

export default function AuthorsPagePreview({ token }: { token: string }) {
  const data: Author[] = usePreview(token, authorsQuery.query);
  return <AuthorsPage data={data} />;
}
