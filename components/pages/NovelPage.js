import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import { PortableText } from "lib/sanity";
// import useDebug from "utils/useDebug";

import InternalLink from "components/portableText/InternalLink";

// import styles from "styles/pages/writing.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function NovelPage({ data }) {
  const { title = "", description = "", overview = [], image = {}, pageColors = {} } = data;

  // const debug = useDebug();
  const { styles: pageStyles } = pageColors;
  // debug && console.log("pageColors", pageColors);

  return (
    <Layout title={title} description={description} image={{ image, portrait: true, crop: false }}>
      {pageStyles ? (
        <style jsx global>
          {pageStyles}
        </style>
      ) : null}

      <PageTitle>{title}</PageTitle>

      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "var(--page-color-primary)",
          color: "white",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        Aa
      </div>
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "var(--page-color-secondary)",
          color: "white",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        Aa
      </div>

      {overview ? <PortableText value={overview} components={portableTextComponents} /> : null}
    </Layout>
  );
}
