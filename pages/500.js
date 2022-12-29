import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export default function Custom500() {
  return (
    <Layout title="500 error" description="A server-side error occurred">
      <PageTitle>500 error</PageTitle>
      <p>A server-side error occurred.</p>
    </Layout>
  );
}
