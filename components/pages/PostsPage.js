import Link from "next/link";
import Date from "components/global/Date";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

// import styles from "styles/pages/contentListing.module.css";

export function PostsPage({ data }) {
  const posts = data;
  return (
    <Layout title="Blog posts" description="A listing of Sandi Plewis' blog posts">
      <PageTitle>Posts</PageTitle>
      <ul>
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
      </ul>
    </Layout>
  );
}
