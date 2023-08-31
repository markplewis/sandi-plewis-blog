"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import NewsItemsPage from "~/components/pages/newsItems/NewsItemsPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { newsItemsQuery, type NewsItem } from "~/utils/queries/newsItems";

export default function PostsPagePreview({ data: initialData }: { data: NewsItem[] }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, newsItemsQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <NewsItemsPage data={data} />
    </>
  );
}
