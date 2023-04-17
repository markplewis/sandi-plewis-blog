import ColorSwatches from "components/global/ColorSwatches";
import InternalLink from "components/portableText/InternalLink";
import LineBreak from "components/portableText/LineBreak";
import PostBodyImage from "components/portableText/PostBodyImage";
import { PortableText } from "lib/sanity";
import useDebug from "utils/useDebug";

import styles from "components/PostBody.module.css";

const portableTextComponents = {
  types: {
    image: ({ value }) => <PostBodyImage value={value} />,
    break: ({ value }) => <LineBreak value={value} />
  },
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function PostBody({ content, pageColors, children = null }) {
  const debug = useDebug();

  return (
    <div className={styles.postBody}>
      {children}
      <PortableText
        className={styles.postBodyBlock}
        value={content}
        components={portableTextComponents}
      />
      {/* TODO: delete this before launch */}
      {debug ? <ColorSwatches pageColors={pageColors} /> : null}
    </div>
  );
}
