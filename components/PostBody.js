import InternalLink from "components/portableText/InternalLink";
import LineBreak from "components/portableText/LineBreak";
import PostBodyImage from "components/portableText/PostBodyImage";
import { PortableText } from "lib/sanity";

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

export default function PostBody({ content }) {
  return (
    <div className={styles.body}>
      <PortableText
        className={styles.bodyBlock}
        value={content}
        components={portableTextComponents}
      />
    </div>
  );
}
