import Link from "next/link";
import type { SPColors } from "~/types/color.d";
import type { Category } from "~/utils/queries/categories";

import styles from "~/components/CategoryList.module.css";

export default function CategoryList({
  categories,
  themed = false,
  centered = false,
  pageColors
}: {
  categories: Category[];
  themed: boolean;
  centered: boolean;
  pageColors?: SPColors.PageColors;
}) {
  if (!categories || !categories.length) {
    return null;
  }
  const contrast = pageColors?.secondary?.contrast || 0;
  const themedClasses: string[] = [];

  if (themed) {
    themedClasses.push(styles.categoryThemed);
    themedClasses.push(contrast < 0 ? styles.categoryThemedLight : styles.categoryThemedDark);
  }
  return (
    <div className={styles.categories}>
      <ul className={`${styles.categoryList} ${centered && styles.categoryListCentered}`}>
        {categories.map(({ slug, title }) => (
          <li key={slug}>
            <Link
              className={`${styles.category} ${themedClasses.join(" ")}`}
              as={`/categories/${slug}`}
              href="/categories/[slug]">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
