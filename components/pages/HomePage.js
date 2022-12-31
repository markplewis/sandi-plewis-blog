import Link from "next/link";
import DisplayDate from "components/global/DisplayDate";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import { PortableText } from "lib/sanity";

import InternalLink from "components/portableText/InternalLink";

// import styles from "styles/pages/home.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export function HomePage({ data }) {
  const { novelAndHomePage, reviews, posts, author } = data;
  const { novel, description } = novelAndHomePage;

  return (
    <Layout title="" description={description}>
      <PageTitle>Home page</PageTitle>

      <section>
        <h2>Novel: {novel?.title}</h2>

        {novel?.overview ? (
          <PortableText value={novel.overview} components={portableTextComponents} />
        ) : null}

        <p>
          <Link as={`/novels/${novel?.slug}`} href="/novels/[slug]">
            More information
          </Link>
        </p>
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
                  <p>
                    <DisplayDate dateString={post?.date} />
                  </p>
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
      </section>

      <section>
        <h2>{author?.name}</h2>

        {author?.shortBiography ? (
          <PortableText value={author.shortBiography} components={portableTextComponents} />
        ) : null}

        <p>
          <Link as={`/authors/${author?.slug}`} href="/authors/[slug]">
            {`More about ${author?.name?.split(" ")[0]}`}
          </Link>
        </p>
      </section>
    </Layout>
  );
}
