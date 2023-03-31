import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

import styles from "styles/layouts/staticPage.module.css";

export default function Custom500() {
  return (
    <Layout title="500 error" description="A server-side error occurred">
      <div className={styles.page}>
        <PageTitle>500 error</PageTitle>

        <div className={styles.pageInner}>
          <p>A server-side error occurred.</p>
        </div>
      </div>
    </Layout>
  );
}
