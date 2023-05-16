import Link from "next/link";
import CategoryList from "~/components/CategoryList";
import DisplayDate from "~/components/DisplayDate";
import type { Post } from "~/utils/queries/posts";

import styles from "~/components/PostMeta.module.css";

export default function PostMeta({
  post,
  creditLine,
  themed = false
}: {
  post: Post;
  creditLine: string;
  themed: boolean;
}) {
  const { author, categories, date, pageColorsAndStyles } = post;
  const pageColors = pageColorsAndStyles?.colors;

  return (
    <div className={`${styles.meta} ${themed && styles.metaThemed}`}>
      <DisplayDate className={styles.date} dateString={date} />
      <p>
        <Link className={styles.author} as={`/authors/${author?.slug}`} href="/authors/[slug]">
          {author?.title}
        </Link>
      </p>

      {categories && categories.length ? (
        <div className={styles.categories}>
          <p className={styles.categoriesHeading}>
            {categories.length > 1 ? "Categories:" : "Category:"}
          </p>
          <CategoryList categories={categories} themed={themed} pageColors={pageColors} />
        </div>
      ) : null}

      {creditLine && (
        <p className={styles.credit} dangerouslySetInnerHTML={{ __html: `Photo: ${creditLine}` }} />
      )}
    </div>
  );
}
