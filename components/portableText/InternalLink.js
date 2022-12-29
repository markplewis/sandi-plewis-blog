// import styles from "components/portableText/InternalLink.module.css";

// See: https://www.sanity.io/guides/portable-text-internal-and-external-links

const InternalLink = ({ value, children }) => {
  const { slug = {}, type } = value;
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
  const href = `/${path}/${slug.current}`;
  return <a href={href}>{children}</a>;
};

export default InternalLink;
