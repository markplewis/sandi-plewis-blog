import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { SITE_TITLE } from "lib/constants";
import { usePreviewSubscription, urlFor } from "lib/sanity";
import { client } from "lib/sanity.server";

import Layout from "components/Layout";

import "pages/styles/author.module.css";

const query = `
  *[_type == "author"][] {
    _id,
    name,
    "slug": slug.current,
    "image": image{..., ...asset->{creditLine, description, url}}
  }
`;

export default function Authors({ data: initialData }) {
  const router = useRouter();

  const { data: authors } = usePreviewSubscription(query, {
    initialData,
    enabled: true
  });

  return !router.isFallback && !authors ? (
    <ErrorPage statusCode={404} />
  ) : (
    <Layout layoutClass="l-author">
      <Head>
        <title>Authors | {SITE_TITLE}</title>
      </Head>
      <h2>Authors</h2>

      {authors.map(author => {
        return (
          <div key={author._id}>
            {author?.image ? (
              <div style={{ width: "188px" }}>
                <Image
                  src={urlFor(author.image.asset).width(376).height(600).url()}
                  width={188}
                  height={300}
                  sizes="188px"
                  layout="responsive"
                  alt={author.image.alt || author.name}
                  placeholder="blur"
                  // Data URL generated here: https://png-pixel.com/
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UQ8AAhUBSQV8WJQAAAAASUVORK5CYII="
                />
              </div>
            ) : null}

            <h3>{author.name}</h3>
            <p>
              <Link as={`/authors/${author?.slug}`} href="/authors/[slug]">
                <a>Read more</a>
              </Link>
            </p>
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await client.fetch(query);
  return {
    props: {
      data
    }
  };
}