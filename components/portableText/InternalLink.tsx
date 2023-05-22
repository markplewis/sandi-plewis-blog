import type { PropsWithChildren, RefObject } from "react";
// import styles from "~/components/portableText/InternalLink.module.css";

// See: https://www.sanity.io/guides/portable-text-internal-and-external-links

type InternalLinkProps = {
  value: { type: string; slug: RefObject<string> };
};

const InternalLink = (props: PropsWithChildren<InternalLinkProps>) => {
  const { value, children } = props;
  const { type } = value;
  const slug = value?.slug?.current || value?.slug;
  let path;

  switch (type) {
    case "post":
      path = "posts";
      break;
    case "novel":
      path = "novels";
      break;
    case "shortStory":
      path = "short-stories";
      break;
  }
  // const href = `/${path}/${slug.current}`;
  const href = `/${path}/${slug}`;
  return <a href={href}>{children}</a>;
};

export default InternalLink;
