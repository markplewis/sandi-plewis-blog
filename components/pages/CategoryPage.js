import Layout from "components/global/Layout";

export function CategoryPage({ data }) {
  const { title = "" } = data;
  return (
    <Layout title={`Category: ${title}`} description={`Blog posts in category: ${title}`}>
      <h1>{title}</h1>
    </Layout>
  );
}
