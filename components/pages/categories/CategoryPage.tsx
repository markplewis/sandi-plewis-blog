import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import MoreLink from "~/components/MoreLink";
import PageTitle from "~/components/PageTitle";
import SubTitle from "~/components/SubTitle";
import type { CategoryWithPosts } from "~/utils/queries/categories";

export default function CategoryPage({ data }: { data: CategoryWithPosts }) {
  const { title = "", posts = [] } = data;
  return (
    <Layout title={`Category: ${title}`} description={`Blog posts in category: ${title}`}>
      <PageTitle centered={true}>{title}</PageTitle>
      <SubTitle as="h2">Posts in this category</SubTitle>
      {posts ? <CardList items={posts} path="posts" showDate={true} /> : null}
      <MoreLink as="/categories" href="/categories" text="More categories" align="center" />
    </Layout>
  );
}
