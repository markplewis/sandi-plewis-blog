import CardList from "components/CardList";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export default function PostsPage({ data }) {
  const posts = data;
  return (
    <Layout title="Blog posts" description="A listing of Sandi Plewis' blog posts">
      <PageTitle centered={true}>Blog posts</PageTitle>
      <CardList items={posts} path="posts" showDate={true} />
    </Layout>
  );
}
