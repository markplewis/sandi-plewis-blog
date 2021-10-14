// import ErrorPage from "next/error";
// import { useRouter } from "next/router";

import { usePreviewSubscription } from "lib/sanity";
import { client } from "lib/sanity.server";

import Layout from "components/Layout";
import MoreLink from "components/MoreLink";
import PageTitle from "components/PageTitle";
import PostList from "components/PostList";

import styles from "pages/styles/contentListing.module.css";

// Get posts in this category
// See: https://css-tricks.com/how-to-make-taxonomy-pages-with-gatsby-and-sanity-io/#querying-sanitys-references
// TODO: paginate posts
const query = `
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "posts": *[_type == "post" && references(^._id)]{
      _id,
      title,
      "date": publishedAt,
      "slug": slug.current,
      "image": image{..., ...asset->{creditLine, description, "palette": metadata.palette, url}},
      description
    }
  }
`;

export default function Category({ data: initialData }) {
  // const router = useRouter();

  const { data: category } = usePreviewSubscription(query, {
    params: {
      slug: initialData?.slug
    },
    initialData,
    enabled: true
  });

  // return !router.isFallback && !category?.slug ? (
  //   <ErrorPage statusCode={404} />
  // ) : ();
  return (
    <Layout
      title={`Category: ${category?.title}`}
      description={`Blog posts in category: ${category?.title}`}>
      <div className={styles.page}>
        <PageTitle>{category?.title}</PageTitle>

        <div className={styles.pageInner}>
          {category?.posts ? (
            <>
              <h2 className={styles.subHeading}>Posts in this category</h2>
              <PostList
                posts={category?.posts}
                path="posts"
                size="large"
                orientation="portrait"
                showDates={true}
                showBackground={true}
              />
            </>
          ) : null}

          <p>
            <MoreLink as="/categories" href="/categories" text="More categories" align="center" />
          </p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const data = await client.fetch(query, {
    slug: params.slug
  });
  if (!data) {
    return {
      notFound: true // Return a 404 status and page
    };
  }
  return {
    props: {
      data
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "category" && defined(slug.current)]{ "params": { "slug": slug.current } }`
  );
  return {
    paths,
    fallback: "blocking"
  };
}
