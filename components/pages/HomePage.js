import Link from "next/link";
import Date from "components/global/Date";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export function HomePage({ data }) {
  const { novelAndHomePage, reviews, posts, author } = data;
  const { novel, description } = novelAndHomePage;

  return (
    <Layout title="" description={description} className="homePage">
      <PageTitle>Home page</PageTitle>

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
                  <Date dateString={post?.date} />
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
