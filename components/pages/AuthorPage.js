import ColorSwatches from "components/global/ColorSwatches";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

// import styles from "styles/layouts/author.module.css";

export default function AuthorPage({ data }) {
  const { name = "", description = "", image = {}, pageColors = {} } = data;
  const { styles: pageStyles } = pageColors;
  return (
    <Layout title={name} description={description} image={{ image, portrait: true, crop: true }}>
      {pageStyles ? (
        <style jsx global>
          {`
            ${pageStyles}
          `}
        </style>
      ) : null}
      <PageTitle>{name}</PageTitle>
      <ColorSwatches />
      <p>{description}</p>
    </Layout>
  );
}
