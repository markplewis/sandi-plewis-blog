import type { PropsWithChildren } from "react";

import styles from "~/components/Main.module.css";

// Defining `children` types: https://blog.logrocket.com/using-react-children-prop-with-typescript/

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.inner2}>{children}</div>
      </div>
    </main>
  );
}
