import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import type { Post } from "~/utils/queries/posts";

export default function PostsPage({ data }: { data: Post[] }) {
  return (
    <Layout title="Blog posts" description="A listing of Sandi Plewis' blog posts">
      <PageTitle centered={true}>Blog posts</PageTitle>
      <CardList items={data} path="posts" showDate={true} />
    </Layout>
  );
}
