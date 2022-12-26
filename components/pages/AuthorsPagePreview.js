"use client";

import { AuthorsPage } from "components/pages/AuthorsPage";
import { usePreview } from "lib/sanity.preview";
import { authorsQuery } from "utils/queries/authors";

export default function AuthorsPagePreview({ token }) {
  const data = usePreview(token, authorsQuery);
  return <AuthorsPage data={data} />;
}
