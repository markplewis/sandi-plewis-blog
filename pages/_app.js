import { Dancing_Script, Literata, Open_Sans } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { AppProvider } from "utils/useApp";
import { BASE_URL, envProd } from "env/constants";

import "modern-normalize/modern-normalize.css";
// import "styles/base.css";
// import "styles/typography.css";

// See: https://nextjs.org/docs/basic-features/font-optimization

// If loading a variable font, you don't need to specify the font weight
const dancingScript = Dancing_Script({ subsets: ["latin"] });
const literata = Literata({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const domain = BASE_URL.split("//").pop();
  return (
    <>
      <style jsx global>{`
        :root {
          --font-dancing-script: ${dancingScript.style.fontFamily};
          --font-literata: ${literata.style.fontFamily};
          --font-open-sans: ${openSans.style.fontFamily};
          --base-font-family: ${openSans.style.fontFamily}, Verdana, sans-serif;
          --heading-font-family: ${literata.style.fontFamily}, serif;
        }
      `}</style>

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
  // Font classes can be applied to elements as follows:
  // <div className={dancingScript.className}></div>
}
