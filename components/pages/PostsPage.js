import Link from "next/link";
import Layout from "components/global/Layout";

export function PostsPage({ data }) {
  const posts = data;
  return (
    <Layout title="Blog posts" description="A listing of Sandi Plewis' blog posts">
      <h1>Posts</h1>
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
