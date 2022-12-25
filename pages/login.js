import Layout from "components/global/Layout";
import LogInButton from "components/global/LogInButton";

export default function Preview() {
  return (
    <Layout title="Preview mode" description="Activate or deactivate preview mode">
      <h1>Preview mode</h1>
      <LogInButton />
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
