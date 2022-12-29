import Link from "next/link";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

// import styles from "styles/pages/contentListing.module.css";

export function AuthorsPage({ data }) {
  const authors = data;
  return (
    <Layout title="Authors" description="Authors">
      <PageTitle>Authors</PageTitle>
      <ul>
        {authors.map(author => (
          <li key={`authors-${author?._id}-${author?.slug}`}>
            <Link as={`/authors/${author?.slug}`} href={`/authors/[slug]`}>
              <h3>{author?.name}</h3>
              <p>{author?.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
