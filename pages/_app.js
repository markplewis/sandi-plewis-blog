import { Dancing_Script, Literata, Open_Sans } from "@next/font/google";
import { AppProvider } from "utils/useApp";

import "modern-normalize/modern-normalize.css";
// import "styles/base.css";
// import "styles/typography.css";

// See: https://nextjs.org/docs/basic-features/font-optimization

// If loading a variable font, you don't need to specify the font weight
const dancingScript = Dancing_Script({ subsets: ["latin"] });
const literata = Literata({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
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
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
  // Font classes can be applied to elements as follows:
  // <div className={dancingScript.className}></div>
}
