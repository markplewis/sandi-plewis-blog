import Layout from "~/components/Layout";
import PageBodyStatic from "~/components/PageBodyStatic";
import PageTitle from "~/components/PageTitle";

export default function Custom500() {
  return (
    <Layout title="500 error" description="A server-side error occurred">
      <PageBodyStatic>
        <PageTitle>500 error</PageTitle>
        <p>A server-side error occurred.</p>
      </PageBodyStatic>
    </Layout>
  );
}
