import CardList from "components/CardList";
import MoreLink from "components/MoreLink";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export default function CategoryPage({ data }) {
  const { title = "", posts = [] } = data;
  return (
    <Layout title={`Category: ${title}`} description={`Blog posts in category: ${title}`}>
      <PageTitle>{title}</PageTitle>
      <h2>Posts in this category</h2>
      {posts ? <CardList items={posts} path="posts" showDate={true} /> : null}
      <MoreLink as="/categories" href="/categories" text="More categories" align="center" />
    </Layout>
  );
}
