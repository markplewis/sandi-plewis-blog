import Link from "next/link";
import DisplayDate from "components/global/DisplayDate";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import { PortableText } from "lib/sanity";

import InternalLink from "components/portableText/InternalLink";
import LineBreak from "components/portableText/LineBreak";
import PostBodyImage from "components/portableText/PostBodyImage";

// import styles from "styles/pages/post.module.css";

const portableTextComponents = {
  types: {
    image: ({ value }) => <PostBodyImage value={value} />,
    break: ({ value }) => <LineBreak value={value} />
  },
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function PostPage({ data }) {
  const {
    title = "",
    body = [],
    description = "",
    date = "",
    categories = [],
    author = {},
    image = {}
  } = data;

  return (
    <Layout title={title} description={description} image={{ image, portrait: false, crop: true }}>
      <PageTitle>{title}</PageTitle>
      <p>
        <DisplayDate dateString={date} />
      </p>
      <p>
        <Link as={`/authors/${author?.slug}`} href="/authors/[slug]">
          {author?.name}
        </Link>
      </p>

      {body ? <PortableText value={body} components={portableTextComponents} /> : null}

      {categories && categories.length ? (
        <div>
          <p>{categories.length > 1 ? "Categories:" : "Category:"}</p>
          <ul>
            {categories.map(({ slug, title }) => (
              <li key={slug}>
                <Link as={`/categories/${slug}`} href="/categories/[slug]">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Layout>
  );
}
