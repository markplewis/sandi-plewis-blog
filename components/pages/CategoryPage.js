import Link from "next/link";
import Layout from "components/global/Layout";

export function CategoryPage({ data }) {
  const { title = "", posts = [] } = data;
  return (
    <Layout title={`Category: ${title}`} description={`Blog posts in category: ${title}`}>
      <h1>{title}</h1>
      <ul>
        {posts.map(post => (
          <li key={`posts-${post?._id}-${post?.slug}`}>
            <Link as={`/posts/${post?.slug}`} href={`/posts/[slug]`}>
              <h3>{post?.title}</h3>
              <p>{post?.date}</p>
              <p>{post?.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
