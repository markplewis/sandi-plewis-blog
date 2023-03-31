import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import LogInButton from "components/global/LogInButton";

import styles from "styles/layouts/staticPage.module.css";

export default function Preview() {
  return (
    <Layout title="Preview mode" description="Activate or deactivate preview mode">
      <div className={styles.page}>
        <PageTitle>Preview mode</PageTitle>

        <div className={styles.pageInner}>
          <LogInButton />
        </div>
      </div>
    </Layout>
  );
}

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps = async ({ preview = false }) => {
  return {
    props: { preview }
  };
};
