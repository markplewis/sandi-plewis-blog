"use client";

import { useRouter } from "next/router";
import { useLiveQuery } from "next-sanity/preview";
import NewsItemPage from "~/components/pages/news/NewsItemPage";
import PreviewLoadingMessage from "~/components/PreviewLoadingMessage";
import { newsItemQuery, type NewsItem } from "~/utils/queries/newsItems";

export default function NewsItemPagePreview({ data: initialData }: { data: NewsItem }) {
  const params = useRouter().query;
  const [data, loading] = useLiveQuery(initialData, newsItemQuery.query, params);
  return (
    <>
      {loading ? <PreviewLoadingMessage /> : null}
      <NewsItemPage data={data} />
    </>
  );
}
