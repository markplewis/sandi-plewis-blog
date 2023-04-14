import { PortableText } from "lib/sanity";
import AuthorImage from "components/AuthorImage";
import MoreLink from "components/MoreLink";
import InternalLink from "components/portableText/InternalLink";

import styles from "components/homePage/AuthorBio.module.css";

const portableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => <InternalLink value={value}>{children}</InternalLink>
  }
};

export default function AuthorBio({ author }) {
  const authorImageUrl = author?.image;
  const authorImageAlt = author?.image?.alt || author?.name;
  const authorImageBlur = author?.image?.lqip;

  return (
    <section className={styles.authorBio}>
      {authorImageUrl ? (
        <>
          <AuthorImage
            className={`${styles.authorBioImage} ${styles.authorBioImageSmall}`}
            url={authorImageUrl}
            width={140}
            alt={authorImageAlt}
            blur={authorImageBlur}
          />
          <AuthorImage
            className={`${styles.authorBioImage} ${styles.authorBioImageLarge}`}
            url={authorImageUrl}
            width={175}
            alt={authorImageAlt}
            blur={authorImageBlur}
          />
        </>
      ) : null}

      <h2 className={styles.authorBioHeading}>{author?.name}</h2>

      {author?.shortBiography ? (
        <PortableText value={author?.shortBiography} components={portableTextComponents} />
      ) : null}

      <MoreLink
        as={`/authors/${author?.slug}`}
        href="/authors/[slug]"
        text={`More about ${author?.name?.split(" ")[0]}`}
        align="end"
      />
    </section>
  );
}
