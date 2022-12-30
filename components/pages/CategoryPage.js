// import Link from "next/link";
// import Date from "components/global/Date";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

// import styles from "styles/pages/contentListing.module.css";

export function CategoryPage({ data }) {
  const { title = "" } = data; // posts = []
  return (
    <Layout title={`Category: ${title}`} description={`Blog posts in category: ${title}`}>
      <PageTitle>{title}</PageTitle>
      {/* <ul>
        {posts.map(post => (
          <li key={`posts-${post?._id}-${post?.slug}`}>
            <Link as={`/posts/${post?.slug}`} href={`/posts/[slug]`}>
              <h3>{post?.title}</h3>
              <p>
                <Date dateString={post?.date} />
              </p>
              <p>{post?.description}</p>
            </Link>
          </li>
        ))}
      </ul> */}
    </Layout>
  );
}
