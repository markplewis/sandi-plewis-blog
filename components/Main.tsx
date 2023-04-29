import styles from "~/components/Main.module.css";

export default function Main({ children }) {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.inner2}>{children}</div>
      </div>
    </main>
  );
}
