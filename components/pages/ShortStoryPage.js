import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export function ShortStoryPage({ data }) {
  const { title = "", description = "" } = data;
  return (
    <Layout title={title} description={description}>
      <PageTitle>{title}</PageTitle>
      <p>{description}</p>
    </Layout>
  );
}
