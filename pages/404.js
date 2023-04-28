import Layout from "components/Layout";
import PageBodyStatic from "components/PageBodyStatic";
import PageTitle from "components/PageTitle";

export default function Custom404() {
  return (
    <Layout title="404 error" description="The page you are looking for could not be found">
      <PageBodyStatic>
        <PageTitle>404 error</PageTitle>
        <p>The page you are looking for could not be found.</p>
      </PageBodyStatic>
    </Layout>
  );
}
