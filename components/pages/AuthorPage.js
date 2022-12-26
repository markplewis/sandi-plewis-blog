import Layout from "components/global/Layout";

export function AuthorPage({ data }) {
  const { name = "", description = "" } = data;
  return (
    <Layout title={name} description={description}>
      <h1>{name}</h1>
      <p>{description}</p>
    </Layout>
  );
}
