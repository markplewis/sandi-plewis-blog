import Image from "next/image";
import Link from "next/link";
import { PortableText, urlFor } from "lib/sanity";
import InternalLink from "components/portableText/InternalLink";
import designTokens from "styles/design-tokens";
import { imageBlurDataURL } from "utils/images";
import useMediaQuery from "utils/useMediaQuery";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function AuthorBio({ author }) {
  const { breakpoints } = designTokens;
  const smallAuthorImage = useMediaQuery(
    `(min-width: ${breakpoints.w1150.value}rem) and (max-width: ${
      breakpoints.w1280.value - 0.1
    }rem)`
  );
  const authorImageSize = smallAuthorImage ? 140 : 175;

  return (
    <>
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
            blurDataURL={author?.image?.lqip || imageBlurDataURL}
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
    </>
  );
}
