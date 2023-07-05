"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import AuthorPage from "~/components/pages/authors/AuthorPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { authorQuery, type Author } from "~/utils/queries/authors";

export default function AuthorPagePreview({ data: initialData }: { data: Author }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, authorQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <AuthorPage data={data} />
    </>
  );
}
