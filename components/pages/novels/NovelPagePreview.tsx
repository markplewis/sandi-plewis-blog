"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import NovelPage from "~/components/pages/novels/NovelPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { novelQuery, type Novel } from "~/utils/queries/novels";

export default function NovelPagePreview({ data: initialData }: { data: Novel }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, novelQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <NovelPage data={data} />
    </>
  );
}
