import Link from "next/link";

export default function RecentPosts({ posts }) {
  return (
    <>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={`posts-${post?._id}-${post?.slug}`}>
            <Link as={`/posts/${post?.slug}`} href={`/posts/[slug]`}>
              <div>
                <h3>{post?.title || post?.name}</h3>
                <p>{post?.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link as={"/posts"} href="/posts">
          More posts
        </Link>
      </p>
    </>
  );
}
