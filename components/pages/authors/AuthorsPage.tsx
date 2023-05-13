import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import type { Author } from "~/utils/queries/authors";

export default function AuthorsPage({ data }: { data: Author[] }) {
  return (
    <Layout title="Authors" description="Authors">
      <PageTitle centered={true}>Authors</PageTitle>
      <CardList items={data} path="authors" showDate={false} />
    </Layout>
  );
}
