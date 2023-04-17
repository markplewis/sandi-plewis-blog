import { Dancing_Script, Literata, Open_Sans } from "next/font/google";
import Router from "next/router";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import NProgress from "nprogress";
import { AppProvider } from "utils/useApp";
import { BASE_URL, envProd } from "env/constants";

import "modern-normalize/modern-normalize.css";
import "nprogress/nprogress.css";
import "styles/global.css";

// If loading a variable font, you don't need to specify the font weight
// See: https://nextjs.org/docs/basic-features/font-optimization
// Font classes can be applied to elements as follows:
// `<div className={dancingScript.className}></div>`

const dancingScript = Dancing_Script({ subsets: ["latin"] });
const literata = Literata({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

// Why we're using a page loading indicator bar:
// See: https://vpilip.com/next-js-page-loading-indicator-improve-ux-of-next-js-app/
// See: https://usabilitypost.com/2013/08/19/new-ui-pattern-website-loading-bars/

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const domain = BASE_URL.split("//").pop();
  return (
    <>
      <style jsx global>{
        /* css */ `
          :root {
            --font-dancing-script: ${dancingScript.style.fontFamily};
            --font-literata: ${literata.style.fontFamily};
            --font-open-sans: ${openSans.style.fontFamily};
            --font-family-base: ${openSans.style.fontFamily}, Verdana, sans-serif;
            --font-family-heading: ${literata.style.fontFamily}, serif;
          }
        `
      }</style>

      {/* See: https://github.com/4lejandrito/next-plausible */}
      <PlausibleProvider domain={domain} enabled={envProd}>
        <AppProvider>
          {/* See: https://authjs.dev/getting-started/oauth-tutorial#exposing-the-session-via-provider */}
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </AppProvider>
      </PlausibleProvider>
    </>
  );
}
