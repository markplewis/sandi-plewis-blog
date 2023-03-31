import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

import styles from "styles/layouts/staticPage.module.css";

export default function Custom404() {
  return (
    <Layout title="404 error" description="The page you are looking for could not be found">
      <div className={styles.page}>
        <PageTitle>404 error</PageTitle>

        <div className={styles.pageInner}>
          <p>The page you are looking for could not be found.</p>
        </div>
      </div>
    </Layout>
  );
}
