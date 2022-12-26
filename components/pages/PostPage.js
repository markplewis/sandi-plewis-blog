import Link from "next/link";
import Layout from "components/global/Layout";

export function PostPage({ data }) {
  const { title = "", description = "", date = "", categories = [], author = {} } = data;
  return (
    <Layout title={title} description={description}>
      <h1>{title}</h1>
      <p>{date}</p>
      <p>
        <Link as={`/authors/${author?.slug}`} href="/authors/[slug]">
          {author?.name}
        </Link>
      </p>
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
