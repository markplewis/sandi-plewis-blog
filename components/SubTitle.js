import styles from "components/SubTitle.module.css";

export default function SubTitle({ children, as = "h2" }) {
  const ElementType = as;
  // @ts-ignore
  return <ElementType className={styles.subTitle}>{children}</ElementType>;
}
