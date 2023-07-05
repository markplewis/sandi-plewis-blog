"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import AuthorsPage from "~/components/pages/authors/AuthorsPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { authorsQuery, type Author } from "~/utils/queries/authors";

export default function AuthorsPagePreview({ data: initialData }: { data: Author[] }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, authorsQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <AuthorsPage data={data} />
    </>
  );
}
