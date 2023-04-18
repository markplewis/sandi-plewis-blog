import Layout from "components/Layout";
import PageTitle from "components/PageTitle";

export default function Custom500() {
  return (
    <Layout title="500 error" description="A server-side error occurred">
      <div>
        <PageTitle>500 error</PageTitle>
        <div>
          <p>A server-side error occurred.</p>
        </div>
      </div>
    </Layout>
  );
}
