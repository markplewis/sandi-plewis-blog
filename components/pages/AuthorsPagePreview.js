"use client";

import { AuthorsPage } from "components/pages/AuthorsPage";
import { usePreview } from "lib/sanity.preview";
import { authorsPageQuery } from "utils/queries/authorsPageQueries";

export default function AuthorsPagePreview({ token }) {
  const data = usePreview(token, authorsPageQuery);
  return <AuthorsPage data={data} />;
}
