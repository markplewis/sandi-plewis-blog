import ColorSwatches from "~/components/ColorSwatches";
import InternalLink from "~/components/portableText/InternalLink";
import LineBreak from "~/components/portableText/LineBreak";
import PageBodyImage from "~/components/portableText/PageBodyImage";
import { PortableText } from "~/lib/sanity";
import useDebug from "~/utils/useDebug";

import styles from "~/components/PageBody.module.css";

const portableTextComponents = {
  types: {
    image: ({ value }) => <PageBodyImage value={value} />,
    break: ({ value }) => <LineBreak value={value} />
  },
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function PageBody({ content, pageColors, children = null }) {
  const debug = useDebug();

  return (
    <div className={styles.pageBody}>
      {children}
      <PortableText
        className={styles.pageBodyBlock}
        value={content}
        components={portableTextComponents}
      />
      {/* TODO: delete this before launch */}
      {debug ? <ColorSwatches pageColors={pageColors} /> : null}
    </div>
  );
}
