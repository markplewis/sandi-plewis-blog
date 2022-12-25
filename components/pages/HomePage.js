import Link from "next/link";
import Layout from "components/global/Layout";

export function HomePage({ data }) {
  const { novelAndHomePage, reviews, posts, author } = data;
  const { novel, description } = novelAndHomePage;

  return (
    <Layout title="" description={description} className="homePage">
      <h1>Home page</h1>

      <section>
        <h2>Novel: {novel?.title}</h2>
      </section>

      <section>
        <h2>Reviews</h2>
        <ul>
          {reviews.map(review => (
            <li key={review?._id}>
              <figure>
                <blockquote>
                  <h3>{review?.title}</h3>
                  <p>{review?.review}</p>
                </blockquote>
                <figcaption>— {review?.author}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={`posts-${post?._id}-${post?.slug}`}>
              <Link as={`/posts/${post?.slug}`} href={`/posts/[slug]`}>
                <div>
                  <h3>{post?.title || post?.name}</h3>
                  <p>{post?.date}</p>
                  <p>{post?.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link as={"/posts"} href="/posts">
          More posts
        </Link>
      </section>

      <section>
        <h2>{author?.name}</h2>
        <Link as={`/authors/${author?.slug}`} href="/authors/[slug]">
          {`More about ${author?.name?.split(" ")[0]}`}
        </Link>
      </section>
    </Layout>
  );
}
