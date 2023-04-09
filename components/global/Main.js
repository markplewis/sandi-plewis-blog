import styles from "components/global/Main.module.css";

export default function Main({ children }) {
  return <main className={styles.main}>{children}</main>;
}
