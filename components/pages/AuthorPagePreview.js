"use client";

import { AuthorPage } from "components/pages/AuthorPage";
import { usePreview } from "lib/sanity.preview";
import { authorPageQuery } from "utils/queries/authorPageQueries";

export default function AuthorPagePreview({ token, slug }) {
  const data = usePreview(token, authorPageQuery, { slug });
  return <AuthorPage data={data} />;
}
