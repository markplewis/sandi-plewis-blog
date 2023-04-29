import styles from "~/components/PageBody.module.css";

export default function PageBodyStatic({ children = null }) {
  return <div className={`${styles.pageBody} ${styles.pageBodyStatic}`}>{children}</div>;
}
