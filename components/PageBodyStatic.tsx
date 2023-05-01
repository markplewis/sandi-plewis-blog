import { ReactNode } from "react";

import styles from "~/components/PageBody.module.css";

// See: https://blog.logrocket.com/using-react-children-prop-with-typescript/

export default function PageBodyStatic({ children = undefined }: { children?: ReactNode }) {
  return <div className={`${styles.pageBody} ${styles.pageBodyStatic}`}>{children}</div>;
}
