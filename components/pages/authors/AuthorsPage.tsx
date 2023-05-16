import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import type { Teaser } from "~/utils/queries/shared";

export default function AuthorsPage({ data }: { data: Teaser[] }) {
  return (
    <Layout title="Authors" description="Authors">
      <PageTitle centered={true}>Authors</PageTitle>
      <CardList items={data} path="authors" showDate={false} />
    </Layout>
  );
}
