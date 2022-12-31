"use client";

import AuthorPage from "components/pages/AuthorPage";
import { usePreview } from "lib/sanity.preview";
import { authorQuery } from "utils/queries/authors";

export default function AuthorPagePreview({ token, slug }) {
  const data = usePreview(token, authorQuery, { slug });
  return <AuthorPage data={data} />;
}
