import Head from "next/head";
import { SITE_TITLE } from "lib/constants";
import Layout from "components/Layout";
import PageTitle from "components/PageTitle";

import commonStyles from "pages/styles/common.module.css";
// import "pages/styles/error.module.css";

// See: https://nextjs.org/docs/advanced-features/custom-error-page

export default function Custom500() {
  return (
    <Layout description="A server-side error occurred">
      <Head>
        <title>500 | {SITE_TITLE}</title>
      </Head>
      <div className={commonStyles.page}>
        <PageTitle>500 - Server-side error occurred</PageTitle>
      </div>
    </Layout>
  );
}
