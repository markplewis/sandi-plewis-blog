import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import type { Teaser } from "~/utils/queries/shared";

export default function NewsItemsPage({ data }: { data: Teaser[] }) {
  return (
    <Layout title="News" description="A listing of Sandi's recent news">
      <PageTitle centered={true}>News</PageTitle>
      <CardList items={data} path="news" showDate={true} />
    </Layout>
  );
}
