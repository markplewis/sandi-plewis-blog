import Layout from "components/global/Layout";

export function PostPage({ data, preview = false }) {
  const { title = "", description = "", date = "" } = data;
  return (
    <Layout title={title} description={description} preview={preview}>
      <h1>
        {title}
        {preview ? " (preview)" : ""}
      </h1>
      <p>{date}</p>
    </Layout>
  );
}
