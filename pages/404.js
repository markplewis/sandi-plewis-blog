import Layout from "components/Layout";
import PageTitle from "components/PageTitle";

export default function Custom404() {
  return (
    <Layout title="404 error" description="The page you are looking for could not be found">
      <div>
        <PageTitle>404 error</PageTitle>
        <div>
          <p>The page you are looking for could not be found.</p>
        </div>
      </div>
    </Layout>
  );
}
