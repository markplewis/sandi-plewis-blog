import Link from "next/link";
import Date from "components/global/Date";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export function PostPage({ data }) {
  const { title = "", description = "", date = "", categories = [], author = {} } = data;
  return (
    <Layout title={title} description={description}>
      <PageTitle>{title}</PageTitle>
      <Date dateString={date} />
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
