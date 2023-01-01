import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

// import styles from "styles/pages/author.module.css";

export default function AuthorPage({ data }) {
  const { name = "", description = "", image = {} } = data;
  return (
    <Layout title={name} description={description} image={{ image, portrait: true, crop: true }}>
      <PageTitle>{name}</PageTitle>
      <p>{description}</p>
    </Layout>
  );
}
