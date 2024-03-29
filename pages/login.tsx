import { GetStaticProps } from "next";
import Layout from "~/components/Layout";
import LogInButton from "~/components/LogInButton";
import PageBodyStatic from "~/components/PageBodyStatic";
import PageTitle from "~/components/PageTitle";

/**
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 * @param {Object} context
 * @returns {Promise<Object>}
 */
export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  return {
    props: { preview }
  };
};

export default function Preview() {
  return (
    <Layout title="Preview mode" description="Activate or deactivate preview mode">
      <PageBodyStatic>
        <PageTitle>Preview mode</PageTitle>
        <LogInButton />
      </PageBodyStatic>
    </Layout>
  );
}
