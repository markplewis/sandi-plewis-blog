import Layout from "components/global/Layout";

export function PostPage({ data }) {
  const { title = "", description = "", date = "" } = data;
  return (
    <Layout title={title} description={description}>
      <h1>{title}</h1>
      <p>{date}</p>
    </Layout>
  );
}
