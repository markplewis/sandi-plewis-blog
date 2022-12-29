import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export function AuthorPage({ data }) {
  const { name = "", description = "" } = data;
  return (
    <Layout title={name} description={description}>
      <PageTitle>{name}</PageTitle>
      <p>{description}</p>
    </Layout>
  );
}
