import type { SanityDocument } from "@sanity/client";

import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";

export default function PostsPage({ data }: { data: SanityDocument }) {
  const posts = data;
  return (
    <Layout title="Blog posts" description="A listing of Sandi Plewis' blog posts">
      <PageTitle centered={true}>Blog posts</PageTitle>
      <CardList items={posts} path="posts" showDate={true} />
    </Layout>
  );
}
