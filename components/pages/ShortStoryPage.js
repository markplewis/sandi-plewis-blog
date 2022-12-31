import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import { PortableText } from "lib/sanity";

import InternalLink from "components/portableText/InternalLink";

// import styles from "styles/pages/writing.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function ShortStoryPage({ data }) {
  const { title = "", description = "", overview = [] } = data;
  return (
    <Layout title={title} description={description}>
      <PageTitle>{title}</PageTitle>
      {overview ? <PortableText value={overview} components={portableTextComponents} /> : null}
    </Layout>
  );
}
