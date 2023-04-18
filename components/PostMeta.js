import Link from "next/link";
import CategoryList from "components/CategoryList";
import DisplayDate from "components/DisplayDate";

import styles from "components/PostMeta.module.css";

export default function PostMeta({
  author,
  categories,
  creditLine,
  date,
  themed = false,
  pageColorData
}) {
  return (
    <div className={`${styles.meta} ${themed && styles.metaThemed}`}>
      <DisplayDate className={styles.date} dateString={date} />
      <p>
        <Link className={styles.author} as={`/authors/${author?.slug}`} href="/authors/[slug]">
          {author?.name}
        </Link>
      </p>

      {categories && categories.length ? (
        <div className={styles.categories}>
          <p className={styles.categoriesHeading}>
            {categories.length > 1 ? "Categories:" : "Category:"}
          </p>
          <CategoryList categories={categories} themed={themed} pageColorData={pageColorData} />
        </div>
      ) : null}

      {creditLine && (
        <p className={styles.credit} dangerouslySetInnerHTML={{ __html: `Photo: ${creditLine}` }} />
      )}
    </div>
  );
}
