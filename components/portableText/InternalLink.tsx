// import styles from "~/components/portableText/InternalLink.module.css";

// See: https://www.sanity.io/guides/portable-text-internal-and-external-links

const InternalLink = ({ value, children }) => {
  // console.log(value.slug);
  // const { slug = {}, type } = value;
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
