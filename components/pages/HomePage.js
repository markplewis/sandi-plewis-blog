import Image from "next/image";
import Link from "next/link";
import DisplayDate from "components/global/DisplayDate";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import { PortableText, urlFor } from "lib/sanity";
import { breakpoints } from "styles/js-env-variables";
import { imageBlurDataURL } from "utils/images";
import useMediaQuery from "utils/useMediaQuery";

import InternalLink from "components/portableText/InternalLink";

// import styles from "styles/pages/home.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function HomePage({ data }) {
  const { novelAndHomePage, reviews = [], posts = [], author } = data;
  const { novel, description } = novelAndHomePage;

  const novelSection = novel ? (
    <section>
      <h2>Novel: {novel?.title}</h2>

      {novel?.image ? (
        // Temporary inline style until layout and/or container queries are ready
        <div style={{ maxWidth: "188px" }}>
          <Link as={`/novels/${novel?.slug}`} href="/novels/[slug]">
            {/* See: https://nextjs.org/docs/advanced-features/codemods#before-responsive */}
            <Image
              src={urlFor(novel?.image).width(376).height(581).url()}
              width={188}
              height={290}
              sizes={`(max-width: ${breakpoints.w800}rem) 100vw, 188px`}
              alt={novel?.image?.alt || novel?.title}
              placeholder="blur"
              blurDataURL={imageBlurDataURL}
              className="responsive-image"
            />
          </Link>
        </div>
      ) : null}

      {novel?.overview ? (
        <PortableText value={novel?.overview} components={portableTextComponents} />
      ) : null}

      <p>
        <Link as={`/novels/${novel?.slug}`} href="/novels/[slug]">
          More information
        </Link>
      </p>
    </section>
  ) : null;

  const reviewsSection = reviews.length ? (
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
  ) : null;

  const postsSection = posts.length ? (
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
  ) : null;

  const smallAuthorImage = useMediaQuery(
    `(min-width: ${breakpoints.w1150}rem) and (max-width: ${breakpoints.w1280 - 0.1}rem)`
  );
  const authorImageSize = smallAuthorImage ? 140 : 175;

  const authorSection = author ? (
    <section>
      {author?.image ? (
        <div style={{ maxWidth: `${authorImageSize}px` }}>
          <Image
            src={urlFor(author?.image)
              .width(authorImageSize * 2)
              .height(authorImageSize * 2)
              .url()}
            width={authorImageSize}
            height={authorImageSize}
            alt={author?.image?.alt || author?.name}
            placeholder="blur"
            blurDataURL={imageBlurDataURL}
            className="responsive-image"
          />
        </div>
      ) : null}

      <h2>{author?.name}</h2>

      {author?.shortBiography ? (
        <PortableText value={author?.shortBiography} components={portableTextComponents} />
      ) : null}

      <p>
        <Link as={`/authors/${author?.slug}`} href="/authors/[slug]">
          {`More about ${author?.name?.split(" ")[0]}`}
        </Link>
      </p>
    </section>
  ) : null;

  return (
    <Layout
      title=""
      description={description}
      image={{ image: author?.image, portrait: true, crop: true }}>
      <PageTitle>Home page</PageTitle>

      {novelSection}
      {reviewsSection}
      {postsSection}
      {authorSection}
    </Layout>
  );
}
