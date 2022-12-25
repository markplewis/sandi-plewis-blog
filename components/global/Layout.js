import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "components/global/Footer";
import Header from "components/global/Header";
import PreviewMessage from "components/global/PreviewMessage";
import SkipLink from "components/global/SkipLink";

import { DEFAULT_META_DESCRIPTION, env, envProd, SITE_TITLE } from "env/constants"; // BASE_URL

import { darkGray, white } from "utils/color/tokens";
import useDebug from "utils/useDebug";

function Layout({ children, title = "", description = DEFAULT_META_DESCRIPTION, className = "" }) {
  const router = useRouter();
  const debug = useDebug();
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const noIndex = !envProd || router.pathname === "/preview";
  debug && console.log(`env: ${env}`);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        {noIndex ? <meta name="robots" content="noindex" /> : null}
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <SkipLink />
      <Header>
        <PreviewMessage />
      </Header>
      <main className={className}>
        <style jsx global>
          {`
            :root {
              --base-background-color: ${white};
              --base-font-color: ${darkGray};
              --primaryBgHigh: ${darkGray};
              --primaryBgLow: ${darkGray};
              --primaryFgHigh: ${white};
              --primaryFgLow: ${white};
              --secondaryBgHigh: ${darkGray};
              --secondaryBgLow: ${darkGray};
              --secondaryFgHigh: ${white};
              --secondaryFgLow: ${white};
            }
          `}
        </style>
        {children}
      </main>
      <Footer />
    </>
  );
}
Layout.displayName = "Layout";
Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  className: PropTypes.string
};
export default Layout;