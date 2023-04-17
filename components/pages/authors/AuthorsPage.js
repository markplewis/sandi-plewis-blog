import CardList from "components/CardList";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export default function AuthorsPage({ data }) {
  const authors = data;
  return (
    <Layout title="Authors" description="Authors">
      <PageTitle centered={true}>Authors</PageTitle>
      <CardList items={authors} path="authors" showDate={false} />
    </Layout>
  );
}
