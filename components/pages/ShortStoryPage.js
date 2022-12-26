import Layout from "components/global/Layout";

export function ShortStoryPage({ data }) {
  const { title = "", description = "" } = data;
  return (
    <Layout title={title} description={description}>
      <h1>{title}</h1>
      <p>{description}</p>
    </Layout>
  );
}
