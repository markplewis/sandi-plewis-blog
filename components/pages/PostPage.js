import Link from "next/link";
import Date from "components/global/Date";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import { PortableText } from "lib/sanity";

import InternalLink from "components/portableText/InternalLink";
import LineBreak from "components/portableText/LineBreak";
import PostBodyImage from "components/portableText/PostBodyImage";

const portableTextComponents = {
  types: {
    image: ({ value }) => <PostBodyImage value={value} />,
    break: ({ value }) => <LineBreak value={value} />
  },
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export function PostPage({ data }) {
  const { title = "", body = "", description = "", date = "", categories = [], author = {} } = data;
  return (
    <Layout title={title} description={description}>
      <PageTitle>{title}</PageTitle>
      <Date dateString={date} />
      <p>
        <Link as={`/authors/${author?.slug}`} href="/authors/[slug]">
          {author?.name}
        </Link>
      </p>

      <PortableText value={body} components={portableTextComponents} />

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
