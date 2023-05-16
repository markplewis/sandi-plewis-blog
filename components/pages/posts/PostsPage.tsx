import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import type { Teaser } from "~/utils/queries/shared";

export default function PostsPage({ data }: { data: Teaser[] }) {
  return (
    <Layout title="Blog posts" description="A listing of Sandi Plewis' blog posts">
      <PageTitle centered={true}>Blog posts</PageTitle>
      <CardList items={data} path="posts" showDate={true} />
    </Layout>
  );
}
