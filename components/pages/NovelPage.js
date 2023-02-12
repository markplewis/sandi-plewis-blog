import ColorSwatches from "components/global/ColorSwatches";
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

      <ColorSwatches />

      {overview ? <PortableText value={overview} components={portableTextComponents} /> : null}
    </Layout>
  );
}
